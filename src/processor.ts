import {
  type BlockHeader,
  type DataHandlerContext,
  EvmBatchProcessor,
  type EvmBatchProcessorFields,
  type Log as _Log,
  type Transaction as _Transaction,
} from '@subsquid/evm-processor'
import type {Store} from '@subsquid/typeorm-store'
import {assertNotNull} from '@subsquid/util-internal'
import * as vaultAbi from './abi/vault'

export const VAULT_CONTRACT_ADDRESS =
  '0x21d6eC8fc14CaAcc55aFA23cBa66798DAB3a0ec0'
export const VAULT_DEPLOYED_AT = 21596326
export const PHA_CONTRACT_ADDRESS = '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E'
export const CONTRACT_DEPLOYED_AT = 9975568

// https://docs.sqd.dev/sdk/reference/processors/evm-batch/logs/#add-log
const addressToTopic = (address: string) => {
  return `0x${address.replace('x', '0').padStart(64, '0').toLowerCase()}`
}

export const processor = new EvmBatchProcessor()
  .includeAllBlocks()
  .setGateway({url: 'https://v2.archive.subsquid.io/network/ethereum-mainnet'})
  .setRpcEndpoint({
    // Set the URL via .env for local runs or via secrets when deploying to Subsquid Cloud
    // https://docs.subsquid.io/deploy-squid/env-variables/
    url: assertNotNull(process.env.RPC_ENDPOINT),
    // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
    rateLimit: 5,
  })
  .setFinalityConfirmation(75)
  .setBlockRange({from: CONTRACT_DEPLOYED_AT})
  .addLog({
    address: [VAULT_CONTRACT_ADDRESS],
    topic0: [vaultAbi.events.Withdraw.topic, vaultAbi.events.Claimed.topic],
    range: {from: VAULT_DEPLOYED_AT},
  })
  .addLog({
    address: [VAULT_CONTRACT_ADDRESS],
    topic0: [vaultAbi.events.Deposit.topic],
    topic1: [addressToTopic(VAULT_CONTRACT_ADDRESS)],
    range: {from: VAULT_DEPLOYED_AT},
  })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
