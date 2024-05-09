import assert from 'assert'
import {BigDecimal} from '@subsquid/big-decimal'
import {TypeormDatabase} from '@subsquid/typeorm-store'
import {addDays, isAfter, isBefore} from 'date-fns'
import * as erc20 from './abi/erc20'
import {Circulation, Snapshot} from './model'
import {
  type Block,
  CONTRACT_ADDRESS,
  type Context,
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

const toBalance = (x: bigint) => BigDecimal(x.toString()).div(1e18)

const fetchCirculation = async (ctx: Context, block: Block) => {
  const contract = new erc20.Contract(ctx, block, CONTRACT_ADDRESS)
  const reward = await contract.balanceOf(REWARD_ADDRESS)
  const phalaChainBridge = await contract.balanceOf(PHALA_CHAIN_BRIDGE_ADDRESS)
  const khalaChainBridge =
    (await contract.balanceOf(KHALA_CHAIN_BRIDGE_ADDRESS)) +
    (await contract.balanceOf(KHALA_LEGACY_CHAIN_BRIDGE_ADDRESS))
  const sygmaBridge = await contract.balanceOf(SYGMA_BRIDGE_ADDRESS)
  const portalBridge = await contract.balanceOf(PORTAL_BRIDGE_ADDRESS)
  const totalSupply = await contract.totalSupply()

  const circulation = [
    reward,
    phalaChainBridge,
    khalaChainBridge,
    sygmaBridge,
    portalBridge,
  ].reduce((acc, cur) => acc - cur, totalSupply)

  return {
    reward: toBalance(reward),
    phalaChainBridge: toBalance(phalaChainBridge),
    khalaChainBridge: toBalance(khalaChainBridge),
    sygmaBridge: toBalance(sygmaBridge),
    portalBridge: toBalance(portalBridge),
    totalSupply: toBalance(totalSupply),
    circulation: toBalance(circulation),
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
  for (const block of ctx.blocks) {
    const timestamp = normalizeTimestamp(block.header.timestamp)
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
      const data = await fetchCirculation(ctx, block.header)
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

  if (ctx.isHead) {
    const block = ctx.blocks.at(-1)
    assert(block?.header.timestamp)
    const data = await fetchCirculation(ctx, block.header)
    const circulation = new Circulation({
      id: '0',
      blockHeight: block.header.height,
      timestamp: new Date(block.header.timestamp),
      ...data,
    })
    await ctx.store.save(circulation)
  }
})
