import {lookupArchive} from '@subsquid/archive-registry'
import {
  type BlockHeader,
  type DataHandlerContext,
  EvmBatchProcessor,
  type EvmBatchProcessorFields,
  type Log as _Log,
  type Transaction as _Transaction,
} from '@subsquid/evm-processor'
import {Store} from '@subsquid/typeorm-store'
import {assertNotNull} from '@subsquid/util-internal'
import * as erc20 from './abi/erc20'

export const CONTRACT_ADDRESS = '0x6c5bA91642F10282b576d91922Ae6448C9d52f4E'
export const CONTRACT_DEPLOYED_AT = 9975568

export const processor = new EvmBatchProcessor()
  .includeAllBlocks()
  .setGateway({
    // Lookup archive by the network name in Subsquid registry
    // See https://docs.subsquid.io/evm-indexing/supported-networks/
    url: lookupArchive('eth-mainnet'),
  })
  .setRpcEndpoint({
    // Set the URL via .env for local runs or via secrets when deploying to Subsquid Cloud
    // https://docs.subsquid.io/deploy-squid/env-variables/
    url: assertNotNull(process.env.RPC_ENDPOINT),
    // More RPC connection options at https://docs.subsquid.io/evm-indexing/configuration/initialization/#set-data-source
    rateLimit: 10,
  })
  .setFinalityConfirmation(75)
  .setFields({
    log: {topics: true, data: true},
    transaction: {hash: true},
  })
  .addLog({
    address: [CONTRACT_ADDRESS],
    topic0: [erc20.events.Transfer.topic],
    transaction: true,
  })
  .setBlockRange({from: CONTRACT_DEPLOYED_AT})

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Context = DataHandlerContext<Store, Fields>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
