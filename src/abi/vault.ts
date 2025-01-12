import * as p from '@subsquid/evm-codec'
import { event, fun, viewFun, indexed, ContractBase } from '@subsquid/evm-abi'
import type { EventParams as EParams, FunctionArguments, FunctionReturn } from '@subsquid/evm-abi'

export const events = {
    Approval: event("0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925", "Approval(address,address,uint256)", {"owner": indexed(p.address), "spender": indexed(p.address), "value": p.uint256}),
    Claimed: event("0x913c992353dc81b7a8ba31496c484e9b6306bd2f6c509a649a38fdf5e1c953b2", "Claimed(address,address,address,uint256)", {"caller": indexed(p.address), "receiver": indexed(p.address), "owner": indexed(p.address), "assets": p.uint256}),
    Deposit: event("0xdcbc1c05240f31ff3ad067ef1ee35ce4997762752e3a095284754544f4c709d7", "Deposit(address,address,uint256,uint256)", {"sender": indexed(p.address), "owner": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
    Initialized: event("0xc7f505b2f371ae2175ee4913f4499e1f2633a7b5936321eed1cdaeb6115181d2", "Initialized(uint64)", {"version": p.uint64}),
    MaxUnlockRequestsUpdated: event("0x7f43a2edb8cbb570917bae7252823a7a3efc95fec4c89c000e37ab9f231895ec", "MaxUnlockRequestsUpdated(uint256,uint256)", {"oldMaxUnlockRequests": p.uint256, "newMaxUnlockRequests": p.uint256}),
    OwnershipTransferred: event("0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0", "OwnershipTransferred(address,address)", {"previousOwner": indexed(p.address), "newOwner": indexed(p.address)}),
    Paused: event("0x62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258", "Paused(address)", {"account": p.address}),
    RewardRateUpdated: event("0xc390a98ace15a7bb6bab611eedfdbb2685043b241a869420043cdfb23ccfee50", "RewardRateUpdated(uint256,uint256)", {"oldRewardRate": p.uint256, "newRewardRate": p.uint256}),
    RewardsSettled: event("0x2bf582ae7b4e23267f9742193453efcc823164c91b245c2d83075e61e4c5c3e9", "RewardsSettled(uint256,uint256,uint256)", {"checkpointTime": p.uint256, "rewards": p.uint256, "totalAssets": p.uint256}),
    Transfer: event("0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef", "Transfer(address,address,uint256)", {"from": indexed(p.address), "to": indexed(p.address), "value": p.uint256}),
    TreasuryAssetsClaimed: event("0x7c95935d1959f3a4b74404de365760a965a891ae39dca9cb73af25fe3f5909e4", "TreasuryAssetsClaimed(address,uint256)", {"receiver": indexed(p.address), "assets": p.uint256}),
    TreasuryRatioUpdated: event("0xec92ad3ba025c421a84313577b933344b2b0a7656a0044b62afe8470a3007703", "TreasuryRatioUpdated(uint256,uint256)", {"oldTreasuryRatio": p.uint256, "newTreasuryRatio": p.uint256}),
    TreasurySettled: event("0xe8585fdde268e6a64ba98b9c9e5a76fdf1a91eaa0c854886fa5c30f36c9129f8", "TreasurySettled(uint256,uint256,uint256)", {"checkpointTime": p.uint256, "treasuryRewards": p.uint256, "treasuryAssets": p.uint256}),
    UnlockPeriodUpdated: event("0xaa1e10941c3aafb56ad74dad40ea5ec52cf44d83495362e44c775124edb040f5", "UnlockPeriodUpdated(uint256,uint256)", {"oldUnlockPeriod": p.uint256, "newUnlockPeriod": p.uint256}),
    Unpaused: event("0x5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa", "Unpaused(address)", {"account": p.address}),
    Withdraw: event("0xfbde797d201c681b91056529119e0b02407c7bb96a4a2c75c01fc9667232c8db", "Withdraw(address,address,address,uint256,uint256)", {"sender": indexed(p.address), "receiver": indexed(p.address), "owner": indexed(p.address), "assets": p.uint256, "shares": p.uint256}),
}

export const functions = {
    allowance: viewFun("0xdd62ed3e", "allowance(address,address)", {"owner": p.address, "spender": p.address}, p.uint256),
    approve: fun("0x095ea7b3", "approve(address,uint256)", {"spender": p.address, "value": p.uint256}, p.bool),
    asset: viewFun("0x38d52e0f", "asset()", {}, p.address),
    balanceOf: viewFun("0x70a08231", "balanceOf(address)", {"account": p.address}, p.uint256),
    cancelUnlockRequest: fun("0x7dbdb4cd", "cancelUnlockRequest(uint256,address)", {"index": p.uint256, "receiver": p.address}, ),
    checkpointTime: viewFun("0x20b2eebe", "checkpointTime()", {}, p.uint256),
    checkpointTotalAssets: viewFun("0x37cbfb54", "checkpointTotalAssets()", {}, p.uint256),
    checkpointTreasuryAssets: viewFun("0x4665336b", "checkpointTreasuryAssets()", {}, p.uint256),
    claim: fun("0x1e83409a", "claim(address)", {"owner": p.address}, ),
    claimTreasury: fun("0x46f61ca8", "claimTreasury(address)", {"receiver": p.address}, ),
    convertToAssets: viewFun("0x07a2d13a", "convertToAssets(uint256)", {"shares": p.uint256}, p.uint256),
    convertToShares: viewFun("0xc6e6f592", "convertToShares(uint256)", {"assets": p.uint256}, p.uint256),
    decimals: viewFun("0x313ce567", "decimals()", {}, p.uint8),
    deposit: fun("0x6e553f65", "deposit(uint256,address)", {"assets": p.uint256, "receiver": p.address}, p.uint256),
    initialize: fun("0x86489ba9", "initialize(address,address,uint256,uint256,uint256,uint256)", {"asset": p.address, "owner": p.address, "initialRewardRate": p.uint256, "initialUnlockPeriod": p.uint256, "initialMaxUnlockRequests": p.uint256, "initialTreasuryRatio": p.uint256}, ),
    maxDeposit: viewFun("0x402d267d", "maxDeposit(address)", {"_0": p.address}, p.uint256),
    maxMint: viewFun("0xc63d75b6", "maxMint(address)", {"_0": p.address}, p.uint256),
    maxRedeem: viewFun("0xd905777e", "maxRedeem(address)", {"owner": p.address}, p.uint256),
    maxUnlockRequests: viewFun("0x4db5f9ca", "maxUnlockRequests()", {}, p.uint256),
    maxWithdraw: viewFun("0xce96cb77", "maxWithdraw(address)", {"owner": p.address}, p.uint256),
    mint: fun("0x94bf804d", "mint(uint256,address)", {"shares": p.uint256, "receiver": p.address}, p.uint256),
    name: viewFun("0x06fdde03", "name()", {}, p.string),
    owner: viewFun("0x8da5cb5b", "owner()", {}, p.address),
    pause: fun("0x8456cb59", "pause()", {}, ),
    paused: viewFun("0x5c975abb", "paused()", {}, p.bool),
    previewDeposit: viewFun("0xef8b30f7", "previewDeposit(uint256)", {"assets": p.uint256}, p.uint256),
    previewMint: viewFun("0xb3d7f6b9", "previewMint(uint256)", {"shares": p.uint256}, p.uint256),
    previewRedeem: viewFun("0x4cdad506", "previewRedeem(uint256)", {"shares": p.uint256}, p.uint256),
    previewWithdraw: viewFun("0x0a28a477", "previewWithdraw(uint256)", {"assets": p.uint256}, p.uint256),
    redeem: fun("0xba087652", "redeem(uint256,address,address)", {"shares": p.uint256, "receiver": p.address, "owner": p.address}, p.uint256),
    renounceOwnership: fun("0x715018a6", "renounceOwnership()", {}, ),
    rewardRate: viewFun("0x7b0a47ee", "rewardRate()", {}, p.uint256),
    setMaxUnlockRequests: fun("0x12bf4076", "setMaxUnlockRequests(uint256)", {"newMaxUnlockRequests": p.uint256}, ),
    setRewardRate: fun("0x9e447fc6", "setRewardRate(uint256)", {"newRewardRate": p.uint256}, ),
    setTreasuryRatio: fun("0x206e0aa7", "setTreasuryRatio(uint256)", {"newTreasuryRatio": p.uint256}, ),
    setUnlockPeriod: fun("0x3d0ddf84", "setUnlockPeriod(uint256)", {"newUnlockPeriod": p.uint256}, ),
    supportsInterface: viewFun("0x01ffc9a7", "supportsInterface(bytes4)", {"interfaceId": p.bytes4}, p.bool),
    symbol: viewFun("0x95d89b41", "symbol()", {}, p.string),
    totalAssets: viewFun("0x01e1d114", "totalAssets()", {}, p.uint256),
    totalSupply: viewFun("0x18160ddd", "totalSupply()", {}, p.uint256),
    transfer: fun("0xa9059cbb", "transfer(address,uint256)", {"to": p.address, "value": p.uint256}, p.bool),
    transferFrom: fun("0x23b872dd", "transferFrom(address,address,uint256)", {"from": p.address, "to": p.address, "value": p.uint256}, p.bool),
    transferOwnership: fun("0xf2fde38b", "transferOwnership(address)", {"newOwner": p.address}, ),
    treasuryAssets: viewFun("0xad24c0e2", "treasuryAssets()", {}, p.uint256),
    treasuryRatio: viewFun("0xba681c4d", "treasuryRatio()", {}, p.uint256),
    unlockPeriod: viewFun("0x20d3a0b4", "unlockPeriod()", {}, p.uint256),
    unlockRequests: viewFun("0x3115da18", "unlockRequests(address)", {"owner": p.address}, p.array(p.struct({"receiver": p.address, "assets": p.uint256, "startTime": p.uint256}))),
    unpause: fun("0x3f4ba83a", "unpause()", {}, ),
    withdraw: fun("0xb460af94", "withdraw(uint256,address,address)", {"assets": p.uint256, "receiver": p.address, "owner": p.address}, p.uint256),
}

export class Contract extends ContractBase {

    allowance(owner: AllowanceParams["owner"], spender: AllowanceParams["spender"]) {
        return this.eth_call(functions.allowance, {owner, spender})
    }

    asset() {
        return this.eth_call(functions.asset, {})
    }

    balanceOf(account: BalanceOfParams["account"]) {
        return this.eth_call(functions.balanceOf, {account})
    }

    checkpointTime() {
        return this.eth_call(functions.checkpointTime, {})
    }

    checkpointTotalAssets() {
        return this.eth_call(functions.checkpointTotalAssets, {})
    }

    checkpointTreasuryAssets() {
        return this.eth_call(functions.checkpointTreasuryAssets, {})
    }

    convertToAssets(shares: ConvertToAssetsParams["shares"]) {
        return this.eth_call(functions.convertToAssets, {shares})
    }

    convertToShares(assets: ConvertToSharesParams["assets"]) {
        return this.eth_call(functions.convertToShares, {assets})
    }

    decimals() {
        return this.eth_call(functions.decimals, {})
    }

    maxDeposit(_0: MaxDepositParams["_0"]) {
        return this.eth_call(functions.maxDeposit, {_0})
    }

    maxMint(_0: MaxMintParams["_0"]) {
        return this.eth_call(functions.maxMint, {_0})
    }

    maxRedeem(owner: MaxRedeemParams["owner"]) {
        return this.eth_call(functions.maxRedeem, {owner})
    }

    maxUnlockRequests() {
        return this.eth_call(functions.maxUnlockRequests, {})
    }

    maxWithdraw(owner: MaxWithdrawParams["owner"]) {
        return this.eth_call(functions.maxWithdraw, {owner})
    }

    name() {
        return this.eth_call(functions.name, {})
    }

    owner() {
        return this.eth_call(functions.owner, {})
    }

    paused() {
        return this.eth_call(functions.paused, {})
    }

    previewDeposit(assets: PreviewDepositParams["assets"]) {
        return this.eth_call(functions.previewDeposit, {assets})
    }

    previewMint(shares: PreviewMintParams["shares"]) {
        return this.eth_call(functions.previewMint, {shares})
    }

    previewRedeem(shares: PreviewRedeemParams["shares"]) {
        return this.eth_call(functions.previewRedeem, {shares})
    }

    previewWithdraw(assets: PreviewWithdrawParams["assets"]) {
        return this.eth_call(functions.previewWithdraw, {assets})
    }

    rewardRate() {
        return this.eth_call(functions.rewardRate, {})
    }

    supportsInterface(interfaceId: SupportsInterfaceParams["interfaceId"]) {
        return this.eth_call(functions.supportsInterface, {interfaceId})
    }

    symbol() {
        return this.eth_call(functions.symbol, {})
    }

    totalAssets() {
        return this.eth_call(functions.totalAssets, {})
    }

    totalSupply() {
        return this.eth_call(functions.totalSupply, {})
    }

    treasuryAssets() {
        return this.eth_call(functions.treasuryAssets, {})
    }

    treasuryRatio() {
        return this.eth_call(functions.treasuryRatio, {})
    }

    unlockPeriod() {
        return this.eth_call(functions.unlockPeriod, {})
    }

    unlockRequests(owner: UnlockRequestsParams["owner"]) {
        return this.eth_call(functions.unlockRequests, {owner})
    }
}

/// Event types
export type ApprovalEventArgs = EParams<typeof events.Approval>
export type ClaimedEventArgs = EParams<typeof events.Claimed>
export type DepositEventArgs = EParams<typeof events.Deposit>
export type InitializedEventArgs = EParams<typeof events.Initialized>
export type MaxUnlockRequestsUpdatedEventArgs = EParams<typeof events.MaxUnlockRequestsUpdated>
export type OwnershipTransferredEventArgs = EParams<typeof events.OwnershipTransferred>
export type PausedEventArgs = EParams<typeof events.Paused>
export type RewardRateUpdatedEventArgs = EParams<typeof events.RewardRateUpdated>
export type RewardsSettledEventArgs = EParams<typeof events.RewardsSettled>
export type TransferEventArgs = EParams<typeof events.Transfer>
export type TreasuryAssetsClaimedEventArgs = EParams<typeof events.TreasuryAssetsClaimed>
export type TreasuryRatioUpdatedEventArgs = EParams<typeof events.TreasuryRatioUpdated>
export type TreasurySettledEventArgs = EParams<typeof events.TreasurySettled>
export type UnlockPeriodUpdatedEventArgs = EParams<typeof events.UnlockPeriodUpdated>
export type UnpausedEventArgs = EParams<typeof events.Unpaused>
export type WithdrawEventArgs = EParams<typeof events.Withdraw>

/// Function types
export type AllowanceParams = FunctionArguments<typeof functions.allowance>
export type AllowanceReturn = FunctionReturn<typeof functions.allowance>

export type ApproveParams = FunctionArguments<typeof functions.approve>
export type ApproveReturn = FunctionReturn<typeof functions.approve>

export type AssetParams = FunctionArguments<typeof functions.asset>
export type AssetReturn = FunctionReturn<typeof functions.asset>

export type BalanceOfParams = FunctionArguments<typeof functions.balanceOf>
export type BalanceOfReturn = FunctionReturn<typeof functions.balanceOf>

export type CancelUnlockRequestParams = FunctionArguments<typeof functions.cancelUnlockRequest>
export type CancelUnlockRequestReturn = FunctionReturn<typeof functions.cancelUnlockRequest>

export type CheckpointTimeParams = FunctionArguments<typeof functions.checkpointTime>
export type CheckpointTimeReturn = FunctionReturn<typeof functions.checkpointTime>

export type CheckpointTotalAssetsParams = FunctionArguments<typeof functions.checkpointTotalAssets>
export type CheckpointTotalAssetsReturn = FunctionReturn<typeof functions.checkpointTotalAssets>

export type CheckpointTreasuryAssetsParams = FunctionArguments<typeof functions.checkpointTreasuryAssets>
export type CheckpointTreasuryAssetsReturn = FunctionReturn<typeof functions.checkpointTreasuryAssets>

export type ClaimParams = FunctionArguments<typeof functions.claim>
export type ClaimReturn = FunctionReturn<typeof functions.claim>

export type ClaimTreasuryParams = FunctionArguments<typeof functions.claimTreasury>
export type ClaimTreasuryReturn = FunctionReturn<typeof functions.claimTreasury>

export type ConvertToAssetsParams = FunctionArguments<typeof functions.convertToAssets>
export type ConvertToAssetsReturn = FunctionReturn<typeof functions.convertToAssets>

export type ConvertToSharesParams = FunctionArguments<typeof functions.convertToShares>
export type ConvertToSharesReturn = FunctionReturn<typeof functions.convertToShares>

export type DecimalsParams = FunctionArguments<typeof functions.decimals>
export type DecimalsReturn = FunctionReturn<typeof functions.decimals>

export type DepositParams = FunctionArguments<typeof functions.deposit>
export type DepositReturn = FunctionReturn<typeof functions.deposit>

export type InitializeParams = FunctionArguments<typeof functions.initialize>
export type InitializeReturn = FunctionReturn<typeof functions.initialize>

export type MaxDepositParams = FunctionArguments<typeof functions.maxDeposit>
export type MaxDepositReturn = FunctionReturn<typeof functions.maxDeposit>

export type MaxMintParams = FunctionArguments<typeof functions.maxMint>
export type MaxMintReturn = FunctionReturn<typeof functions.maxMint>

export type MaxRedeemParams = FunctionArguments<typeof functions.maxRedeem>
export type MaxRedeemReturn = FunctionReturn<typeof functions.maxRedeem>

export type MaxUnlockRequestsParams = FunctionArguments<typeof functions.maxUnlockRequests>
export type MaxUnlockRequestsReturn = FunctionReturn<typeof functions.maxUnlockRequests>

export type MaxWithdrawParams = FunctionArguments<typeof functions.maxWithdraw>
export type MaxWithdrawReturn = FunctionReturn<typeof functions.maxWithdraw>

export type MintParams = FunctionArguments<typeof functions.mint>
export type MintReturn = FunctionReturn<typeof functions.mint>

export type NameParams = FunctionArguments<typeof functions.name>
export type NameReturn = FunctionReturn<typeof functions.name>

export type OwnerParams = FunctionArguments<typeof functions.owner>
export type OwnerReturn = FunctionReturn<typeof functions.owner>

export type PauseParams = FunctionArguments<typeof functions.pause>
export type PauseReturn = FunctionReturn<typeof functions.pause>

export type PausedParams = FunctionArguments<typeof functions.paused>
export type PausedReturn = FunctionReturn<typeof functions.paused>

export type PreviewDepositParams = FunctionArguments<typeof functions.previewDeposit>
export type PreviewDepositReturn = FunctionReturn<typeof functions.previewDeposit>

export type PreviewMintParams = FunctionArguments<typeof functions.previewMint>
export type PreviewMintReturn = FunctionReturn<typeof functions.previewMint>

export type PreviewRedeemParams = FunctionArguments<typeof functions.previewRedeem>
export type PreviewRedeemReturn = FunctionReturn<typeof functions.previewRedeem>

export type PreviewWithdrawParams = FunctionArguments<typeof functions.previewWithdraw>
export type PreviewWithdrawReturn = FunctionReturn<typeof functions.previewWithdraw>

export type RedeemParams = FunctionArguments<typeof functions.redeem>
export type RedeemReturn = FunctionReturn<typeof functions.redeem>

export type RenounceOwnershipParams = FunctionArguments<typeof functions.renounceOwnership>
export type RenounceOwnershipReturn = FunctionReturn<typeof functions.renounceOwnership>

export type RewardRateParams = FunctionArguments<typeof functions.rewardRate>
export type RewardRateReturn = FunctionReturn<typeof functions.rewardRate>

export type SetMaxUnlockRequestsParams = FunctionArguments<typeof functions.setMaxUnlockRequests>
export type SetMaxUnlockRequestsReturn = FunctionReturn<typeof functions.setMaxUnlockRequests>

export type SetRewardRateParams = FunctionArguments<typeof functions.setRewardRate>
export type SetRewardRateReturn = FunctionReturn<typeof functions.setRewardRate>

export type SetTreasuryRatioParams = FunctionArguments<typeof functions.setTreasuryRatio>
export type SetTreasuryRatioReturn = FunctionReturn<typeof functions.setTreasuryRatio>

export type SetUnlockPeriodParams = FunctionArguments<typeof functions.setUnlockPeriod>
export type SetUnlockPeriodReturn = FunctionReturn<typeof functions.setUnlockPeriod>

export type SupportsInterfaceParams = FunctionArguments<typeof functions.supportsInterface>
export type SupportsInterfaceReturn = FunctionReturn<typeof functions.supportsInterface>

export type SymbolParams = FunctionArguments<typeof functions.symbol>
export type SymbolReturn = FunctionReturn<typeof functions.symbol>

export type TotalAssetsParams = FunctionArguments<typeof functions.totalAssets>
export type TotalAssetsReturn = FunctionReturn<typeof functions.totalAssets>

export type TotalSupplyParams = FunctionArguments<typeof functions.totalSupply>
export type TotalSupplyReturn = FunctionReturn<typeof functions.totalSupply>

export type TransferParams = FunctionArguments<typeof functions.transfer>
export type TransferReturn = FunctionReturn<typeof functions.transfer>

export type TransferFromParams = FunctionArguments<typeof functions.transferFrom>
export type TransferFromReturn = FunctionReturn<typeof functions.transferFrom>

export type TransferOwnershipParams = FunctionArguments<typeof functions.transferOwnership>
export type TransferOwnershipReturn = FunctionReturn<typeof functions.transferOwnership>

export type TreasuryAssetsParams = FunctionArguments<typeof functions.treasuryAssets>
export type TreasuryAssetsReturn = FunctionReturn<typeof functions.treasuryAssets>

export type TreasuryRatioParams = FunctionArguments<typeof functions.treasuryRatio>
export type TreasuryRatioReturn = FunctionReturn<typeof functions.treasuryRatio>

export type UnlockPeriodParams = FunctionArguments<typeof functions.unlockPeriod>
export type UnlockPeriodReturn = FunctionReturn<typeof functions.unlockPeriod>

export type UnlockRequestsParams = FunctionArguments<typeof functions.unlockRequests>
export type UnlockRequestsReturn = FunctionReturn<typeof functions.unlockRequests>

export type UnpauseParams = FunctionArguments<typeof functions.unpause>
export type UnpauseReturn = FunctionReturn<typeof functions.unpause>

export type WithdrawParams = FunctionArguments<typeof functions.withdraw>
export type WithdrawReturn = FunctionReturn<typeof functions.withdraw>

