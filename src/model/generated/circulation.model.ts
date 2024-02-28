import {BigDecimal} from "@subsquid/big-decimal"
import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Circulation {
    constructor(props?: Partial<Circulation>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    blockHeight!: number

    @Column_("timestamp with time zone", {nullable: false})
    timestamp!: Date

    @Column_("numeric", {transformer: marshal.bigdecimalTransformer, nullable: false})
    reward!: BigDecimal

    @Column_("numeric", {transformer: marshal.bigdecimalTransformer, nullable: false})
    phalaChainBridge!: BigDecimal

    @Column_("numeric", {transformer: marshal.bigdecimalTransformer, nullable: false})
    khalaChainBridge!: BigDecimal

    @Column_("numeric", {transformer: marshal.bigdecimalTransformer, nullable: false})
    sygmaBridge!: BigDecimal

    @Column_("numeric", {transformer: marshal.bigdecimalTransformer, nullable: false})
    totalSupply!: BigDecimal

    @Column_("numeric", {transformer: marshal.bigdecimalTransformer, nullable: false})
    circulation!: BigDecimal
}
