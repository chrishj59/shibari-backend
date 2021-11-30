import {MigrationInterface, QueryRunner} from "typeorm";

export class dsRelationships1629967245387 implements MigrationInterface {
    name = 'dsRelationships1629967245387'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."user-ds-realtionships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "relationship" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_DS-RELATIONSHIP_RELATIONSHIP" UNIQUE ("relationship"), CONSTRAINT "PK_94d6a4ce60bad82c0a7646855f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "dsRelationshipId"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "dsRelationshipId" uuid`);
        await queryRunner.query(`DROP TABLE "shibari"."user-ds-realtionships"`);
    }

}
