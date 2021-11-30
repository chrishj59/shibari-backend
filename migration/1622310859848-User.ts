import {MigrationInterface, QueryRunner} from "typeorm";

export class User1622310859848 implements MigrationInterface {
    name = 'User1622310859848'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."user_title" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "short_name" character varying(10) NOT NULL, "name" character varying NOT NULL, "seq" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_6624e3bf1b2a6553351afafbc32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "family_name" character varying NOT NULL, "category" character varying NOT NULL, "logitude" numeric(8,5) NOT NULL, "latitude" numeric(8,5) NOT NULL, "avitar_data" character varying NOT NULL, "avitar_media_type" character varying NOT NULL, "plan_amount" numeric(13,2) NOT NULL, "paid_to" date NOT NULL, "dob" date NOT NULL, "about" text NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_3891eb87bdaa2816529b18665b8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shibari"."user"`);
        await queryRunner.query(`DROP TABLE "shibari"."user_title"`);
    }

}
