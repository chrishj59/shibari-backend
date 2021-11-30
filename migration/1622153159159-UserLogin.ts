import {MigrationInterface, QueryRunner} from "typeorm";

export class UserLogin1622153159159 implements MigrationInterface {
    name = 'UserLogin1622153159159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."place" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying NOT NULL, "lang_name" character varying NOT NULL, "alpha2" character varying NOT NULL, "alpha3" character varying NOT NULL, "alpha4" character varying NOT NULL, "numeric" integer NOT NULL, "name" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL, "update_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_ff368b0f0b9effabca10a24943c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" DROP COLUMN "faile_logins"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ADD "failed_logins" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_logins_role_enum" AS ENUM('admin', 'paid', 'free')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ADD "role" "shibari"."user_logins_role_enum" NOT NULL DEFAULT 'free'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "shibari"."user_logins_role_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" DROP COLUMN "failed_logins"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ADD "faile_logins" integer NOT NULL`);
        await queryRunner.query(`DROP TABLE "shibari"."place"`);
    }

}
