import assert from 'node:assert'
import {BigDecimal} from '@subsquid/big-decimal'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {addDays, isAfter, isBefore} from 'date-fns'
import {ethers} from 'ethers'
import * as erc20Abi from './abi/erc20'
import * as vaultAbi from './abi/vault'
import {Circulation, Snapshot} from './model'
import {
  type Block,
  type Context,
  PHA_CONTRACT_ADDRESS,
  VAULT_CONTRACT_ADDRESS,
  VAULT_DEPLOYED_AT,
  processor,
} from './processor'

const REWARD_ADDRESS = '0x4731bc41b3cca4c2883b8ebb68cb546d5b3b4dd6'
const PHALA_CHAIN_BRIDGE_ADDRESS = '0xcd38b15a419491c7c1238b0659f65c755792e257'
const KHALA_LEGACY_CHAIN_BRIDGE_ADDRESS =
  '0x6ed3bc069cf4f87de05c04c352e8356492ec6efe'
const KHALA_CHAIN_BRIDGE_ADDRESS = '0xeec0fb4913119567cdfc0c5fc2bf8f9f9b226c2d'
const SYGMA_BRIDGE_ADDRESS = '0xC832588193cd5ED2185daDA4A531e0B26eC5B830'
const PORTAL_BRIDGE_ADDRESS = '0x3ee18B2214AFF97000D974cf647E7C347E8fa585'

const normalizeTimestamp = (timestamp?: number): Date => {
  assert(timestamp)
  const date = new Date(timestamp)
  date.setUTCHours(0, 0, 0, 0)
  return date
}

const toBalance = (x: bigint) => BigDecimal(ethers.formatUnits(x))
const toBigInt = (x: BigDecimal) => ethers.parseUnits(x.toString())

const fetchCirculation = async (
  ctx: Context,
  block: Block,
  vaultUnstakeLocked: bigint,
) => {
  const pha = new erc20Abi.Contract(ctx, block, PHA_CONTRACT_ADDRESS)
  const vault = new vaultAbi.Contract(ctx, block, VAULT_CONTRACT_ADDRESS)
  const reward = await pha.balanceOf(REWARD_ADDRESS)
  const phalaChainBridge = await pha.balanceOf(PHALA_CHAIN_BRIDGE_ADDRESS)
  const khalaChainBridge =
    (await pha.balanceOf(KHALA_CHAIN_BRIDGE_ADDRESS)) +
    (await pha.balanceOf(KHALA_LEGACY_CHAIN_BRIDGE_ADDRESS))
  const sygmaBridge = await pha.balanceOf(SYGMA_BRIDGE_ADDRESS)
  const portalBridge = await pha.balanceOf(PORTAL_BRIDGE_ADDRESS)
  const totalSupply = await pha.totalSupply()

  const isVaultDeployed = block.height >= VAULT_DEPLOYED_AT
  const vaultAssets = isVaultDeployed ? await vault.totalAssets() : 0n
  const vaultTreasuryAssets = isVaultDeployed
    ? await vault.treasuryAssets()
    : 0n
  const vaultBalance = isVaultDeployed
    ? await pha.balanceOf(VAULT_CONTRACT_ADDRESS)
    : 0n
  const vaultReward =
    vaultBalance - vaultAssets - vaultTreasuryAssets - vaultUnstakeLocked

  const circulation = [
    reward,
    phalaChainBridge,
    khalaChainBridge,
    sygmaBridge,
    portalBridge,
    vaultReward,
  ].reduce((acc, cur) => acc - cur, totalSupply)

  return {
    reward: toBalance(reward),
    vaultReward: toBalance(vaultReward),
    phalaChainBridge: toBalance(phalaChainBridge),
    khalaChainBridge: toBalance(khalaChainBridge),
    sygmaBridge: toBalance(sygmaBridge),
    portalBridge: toBalance(portalBridge),
    totalSupply: toBalance(totalSupply),
    circulation: toBalance(circulation),
    vaultUnstakeLocked: toBalance(vaultUnstakeLocked),
  }
}

processor.run(new TypeormDatabase(), async (ctx) => {
  let latestSnapshot = (
    await ctx.store.find(Snapshot, {
      order: {blockHeight: 'DESC'},
      take: 1,
    })
  ).at(0)
  const snapshots: Snapshot[] = []
  const circulation =
    (await ctx.store.get(Circulation, '0')) ??
    new Circulation({
      id: '0',
      blockHeight: 0,
      timestamp: new Date(0),
      reward: BigDecimal(0),
      vaultReward: BigDecimal(0),
      vaultUnstakeLocked: BigDecimal(0),
      phalaChainBridge: BigDecimal(0),
      khalaChainBridge: BigDecimal(0),
      sygmaBridge: BigDecimal(0),
      portalBridge: BigDecimal(0),
      totalSupply: BigDecimal(0),
      circulation: BigDecimal(0),
    })
  let vaultUnstakeLocked = toBigInt(circulation.vaultUnstakeLocked)

  for (const block of ctx.blocks) {
    const timestamp = normalizeTimestamp(block.header.timestamp)

    for (const log of block.logs) {
      if (log.address.toLowerCase() === VAULT_CONTRACT_ADDRESS.toLowerCase()) {
        if (log.topics[0] === vaultAbi.events.Withdraw.topic) {
          const {assets} = vaultAbi.events.Withdraw.decode(log)
          vaultUnstakeLocked += assets
        }
        if (log.topics[0] === vaultAbi.events.Claimed.topic) {
          const {assets} = vaultAbi.events.Claimed.decode(log)
          vaultUnstakeLocked -= assets
        }
      }
    }

    if (
      latestSnapshot?.timestamp == null ||
      isAfter(timestamp, latestSnapshot.timestamp)
    ) {
      if (latestSnapshot?.timestamp != null) {
        for (
          let i = addDays(latestSnapshot.timestamp, 1);
          isBefore(i, timestamp);
          i = addDays(i, 1)
        ) {
          const snapshot = new Snapshot({
            ...latestSnapshot,
            id: i.toISOString(),
            timestamp: i,
          })
          snapshots.push(snapshot)
        }
      }

      ctx.log.info(
        `Fetching snapshot ${block.header.height} ${timestamp.toISOString()}`,
      )
      const data = await fetchCirculation(ctx, block.header, vaultUnstakeLocked)
      const snapshot = new Snapshot({
        id: timestamp.toISOString(),
        blockHeight: block.header.height,
        timestamp,
        ...data,
      })
      snapshots.push(snapshot)
      latestSnapshot = snapshot
    }
  }
  await ctx.store.save(snapshots)
  circulation.vaultUnstakeLocked = toBalance(vaultUnstakeLocked)
  await ctx.store.save(circulation)

  if (ctx.isHead) {
    const block = ctx.blocks.at(-1)
    assert(block?.header.timestamp)
    const data = await fetchCirculation(ctx, block.header, vaultUnstakeLocked)
    const circulation = new Circulation({
      id: '0',
      blockHeight: block.header.height,
      timestamp: new Date(block.header.timestamp),
      ...data,
    })
    await ctx.store.save(circulation)
  }
})
