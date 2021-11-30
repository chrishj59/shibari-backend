import {MigrationInterface, QueryRunner} from "typeorm";

export class ukTown1622666879876 implements MigrationInterface {
    name = 'ukTown1622666879876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."uk-town" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "place" character varying NOT NULL, "county" character varying NOT NULL, "country" character varying NOT NULL, "post-code" character varying NOT NULL, "gridRef" character varying NOT NULL, "lat" numeric(8,5) NOT NULL, "lng" numeric(8,5) NOT NULL, "location" geometry(Point,4326), "easting" integer NOT NULL, "northing" integer NOT NULL, "region" character varying NOT NULL, "category" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_b2153ccec13a0c63b888a61199b" UNIQUE ("place"), CONSTRAINT "PK_f3aeaaa5f6182df64f4285cb7e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shibari"."country" ADD "createdDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shibari"."country" ADD "updatedDate" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "shibari"."country" ADD "version" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."country" DROP COLUMN "version"`);
        await queryRunner.query(`ALTER TABLE "shibari"."country" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "shibari"."country" DROP COLUMN "createdDate"`);
        await queryRunner.query(`DROP TABLE "shibari"."uk-town"`);
    }

}
