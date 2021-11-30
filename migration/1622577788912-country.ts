import {MigrationInterface, QueryRunner} from "typeorm";

export class country1622577788912 implements MigrationInterface {
    name = 'country1622577788912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying(2) NOT NULL, "lang_name" character varying NOT NULL, "code_alpha_2" character varying(2) NOT NULL, "code_alpha_3" character varying(3) NOT NULL, "code_numeric" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_17930a0b0b6ba185122d8d30e5b" UNIQUE ("code_alpha_2"), CONSTRAINT "UQ_de1f79f17ed15dd5c6695ce5b80" UNIQUE ("code_alpha_3"), CONSTRAINT "UQ_b7c9120c04a22a62a821a11ae60" UNIQUE ("code_numeric"), CONSTRAINT "PK_3f99e82d69526d3299a18b12c95" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "shibari"."country"`);
    }

}
