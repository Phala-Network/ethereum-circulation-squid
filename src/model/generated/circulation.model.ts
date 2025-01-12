import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, IntColumn as IntColumn_, DateTimeColumn as DateTimeColumn_, BigDecimalColumn as BigDecimalColumn_} from "@subsquid/typeorm-store"

@Entity_()
export class Circulation {
    constructor(props?: Partial<Circulation>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @IntColumn_({nullable: false})
    blockHeight!: number

    @DateTimeColumn_({nullable: false})
    timestamp!: Date

    @BigDecimalColumn_({nullable: false})
    reward!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    vaultReward!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    vaultUnstakeLocked!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    phalaChainBridge!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    khalaChainBridge!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    sygmaBridge!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    portalBridge!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    totalSupply!: BigDecimal

    @BigDecimalColumn_({nullable: false})
    circulation!: BigDecimal
}
