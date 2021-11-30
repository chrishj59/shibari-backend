import {MigrationInterface, QueryRunner} from "typeorm";

export class RefreshToken1622839512499 implements MigrationInterface {
    name = 'RefreshToken1622839512499'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."refresh-tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "is_revoked" boolean NOT NULL, "expires" TIMESTAMP NOT NULL, "userLoginId" uuid, CONSTRAINT "REL_4a6ee1fb46c28b69b1d9a1ea6e" UNIQUE ("userLoginId"), CONSTRAINT "PK_86a28548f626e26cab8c221c76d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shibari"."refresh-tokens" ADD CONSTRAINT "FK_4a6ee1fb46c28b69b1d9a1ea6e5" FOREIGN KEY ("userLoginId") REFERENCES "shibari"."user_logins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."refresh-tokens" DROP CONSTRAINT "FK_4a6ee1fb46c28b69b1d9a1ea6e5"`);
        await queryRunner.query(`DROP TABLE "shibari"."refresh-tokens"`);
    }

}
