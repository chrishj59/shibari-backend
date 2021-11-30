import {MigrationInterface, QueryRunner} from "typeorm";

export class addLocation1637585875474 implements MigrationInterface {
    name = 'addLocation1637585875474'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."countries-language-map" ("country-name" character varying NOT NULL, "country-alpha2" character varying(2) NOT NULL, "lang-alpha3B" character varying(3) NOT NULL, "sequence" integer NOT NULL, CONSTRAINT "PK_9172e69dab348c7c1651267e48c" PRIMARY KEY ("country-alpha2", "lang-alpha3B"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."iso_639_lang" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alfa3_b" character varying NOT NULL, "alfa3_t" character varying, "alpha2" character varying NOT NULL, "english_name" character varying NOT NULL, "french_name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_8bc8b609eaa6ec771a57a2740f5" UNIQUE ("alfa3_b"), CONSTRAINT "PK_6237713b031dc07bb4c3af380fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."country" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "lang" character varying(2) NOT NULL, "lang_name" character varying NOT NULL, "code_alpha_2" character varying(2) NOT NULL, "code_alpha_3" character varying(3) NOT NULL, "code_numeric" integer NOT NULL, "name" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_17930a0b0b6ba185122d8d30e5b" UNIQUE ("code_alpha_2"), CONSTRAINT "UQ_de1f79f17ed15dd5c6695ce5b80" UNIQUE ("code_alpha_3"), CONSTRAINT "UQ_b7c9120c04a22a62a821a11ae60" UNIQUE ("code_numeric"), CONSTRAINT "PK_3f99e82d69526d3299a18b12c95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."country_state" ("id" integer NOT NULL, "name" character varying NOT NULL, "country_code" character varying NOT NULL, "state_code" character varying NOT NULL, "type" character varying NOT NULL, "latitude" numeric(8,5), "longitude" numeric(8,5), "location" geometry(Point,4326), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "country_id" integer, CONSTRAINT "PK_22a0ffe2ff1ff54649defb1c927" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."country_city" ("id" integer NOT NULL, "name" character varying NOT NULL, "state_code" character varying NOT NULL, "country_code" character varying NOT NULL, "latitude" numeric(8,5) NOT NULL, "longitude" numeric(8,5) NOT NULL, "location" geometry(Point,4326), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "state_id" integer, "country_id" integer, CONSTRAINT "PK_e36936a346ab40621d199c5ef3c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."country_geo" ("id" integer NOT NULL, "name" character varying NOT NULL, "lang_code" character varying, "lang_name" character varying, "iso3" character varying NOT NULL, "iso2" character varying NOT NULL, "numeric_code" integer NOT NULL, "phone_code" character varying NOT NULL, "capital" character varying NOT NULL, "currency" character varying NOT NULL, "currency_symbol" character varying NOT NULL, "tld" character varying NOT NULL, "region" character varying NOT NULL, "sub_region" character varying NOT NULL, "timezones" character varying NOT NULL, "latitude" numeric(8,5) NOT NULL, "longitude" numeric(8,5) NOT NULL, "location" geometry(Point,4326), "emoji" character varying NOT NULL, "emojiu" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_539c4638f4386cd9e9ba4ea1534" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."country_state" ADD CONSTRAINT "FK_977274c1471b5b4928f8722edff" FOREIGN KEY ("country_id") REFERENCES "shibari"."country_geo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."country_city" ADD CONSTRAINT "FK_eab0f9acb48bc219d844f21698b" FOREIGN KEY ("state_id") REFERENCES "shibari"."country_state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."country_city" ADD CONSTRAINT "FK_98ce299d045159bbee837c7ec55" FOREIGN KEY ("country_id") REFERENCES "shibari"."country_geo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."country_city" DROP CONSTRAINT "FK_98ce299d045159bbee837c7ec55"`);
        await queryRunner.query(`ALTER TABLE "shibari"."country_city" DROP CONSTRAINT "FK_eab0f9acb48bc219d844f21698b"`);
        await queryRunner.query(`ALTER TABLE "shibari"."country_state" DROP CONSTRAINT "FK_977274c1471b5b4928f8722edff"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`DROP TABLE "shibari"."country_geo"`);
        await queryRunner.query(`DROP TABLE "shibari"."country_city"`);
        await queryRunner.query(`DROP TABLE "shibari"."country_state"`);
        await queryRunner.query(`DROP TABLE "shibari"."country"`);
        await queryRunner.query(`DROP TABLE "shibari"."iso_639_lang"`);
        await queryRunner.query(`DROP TABLE "shibari"."countries-language-map"`);
    }

}
