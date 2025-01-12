module.exports = class Data1736708516286 {
    name = 'Data1736708516286'

    async up(db) {
        await db.query(`ALTER TABLE "circulation" ADD "vault_reward" numeric NOT NULL DEFAULT 0`)
        await db.query(`ALTER TABLE "circulation" ADD "vault_unstake_locked" numeric NOT NULL DEFAULT 0`)
        await db.query(`ALTER TABLE "snapshot" ADD "vault_reward" numeric NOT NULL DEFAULT 0`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "circulation" DROP COLUMN "vault_reward"`)
        await db.query(`ALTER TABLE "circulation" DROP COLUMN "vault_unstake_locked"`)
        await db.query(`ALTER TABLE "snapshot" DROP COLUMN "vault_reward"`)
    }
}
