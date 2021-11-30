import {MigrationInterface, QueryRunner} from "typeorm";

export class userFetishRenameCol1630839122761 implements MigrationInterface {
    name = 'userFetishRenameCol1630839122761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "shibari"."IDX_49588c72ce48bf42ca3736e19a"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-fetish-map" RENAME COLUMN "receive_fetish" TO "recieve_fetish"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_2647c20089f2137b9af96e67cf" ON "shibari"."user-fetish-map" ("give_fetsih", "recieve_fetish") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "shibari"."IDX_2647c20089f2137b9af96e67cf"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-fetish-map" RENAME COLUMN "recieve_fetish" TO "receive_fetish"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_49588c72ce48bf42ca3736e19a" ON "shibari"."user-fetish-map" ("give_fetsih", "receive_fetish") `);
    }

}
