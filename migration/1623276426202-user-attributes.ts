import {MigrationInterface, QueryRunner} from "typeorm";

export class userAttributes1623276426202 implements MigrationInterface {
    name = 'userAttributes1623276426202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."user-orientations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_3aeaa2135eacb41ab24582b0b0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."user-pronouns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_a6df8eeb7a521ba39687cb1e7b0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."user-roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "roleCode" character varying NOT NULL, "roleName" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_5e0d4697f53758e5b2d7e18242b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."user-genders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_06b71518f83e2149a790392be9b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "pronoun"`);
        await queryRunner.query(`DROP TYPE "shibari"."user_pronoun_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "gender"`);
        await queryRunner.query(`DROP TYPE "shibari"."user_gender_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "oriientation"`);
        await queryRunner.query(`DROP TYPE "shibari"."user_oriientation_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "roleId" uuid`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "pronounId" uuid`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "orientationId" uuid`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "genderId" uuid`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_ef131fb09b8c8069eb51a54951f" FOREIGN KEY ("roleId") REFERENCES "shibari"."user-roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_4c9114f59ddaa94899a6283c926" FOREIGN KEY ("pronounId") REFERENCES "shibari"."user-pronouns"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_ce37282aea9a85725bfcd7d3e33" FOREIGN KEY ("orientationId") REFERENCES "shibari"."user-orientations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_429dd6e9d4456f55bc727955c73" FOREIGN KEY ("genderId") REFERENCES "shibari"."user-genders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_429dd6e9d4456f55bc727955c73"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_ce37282aea9a85725bfcd7d3e33"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_4c9114f59ddaa94899a6283c926"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_ef131fb09b8c8069eb51a54951f"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "genderId"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "orientationId"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "pronounId"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "roleId"`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_oriientation_enum" AS ENUM('Allosexual', 'Graysexual', 'Gynesexual', 'Heterosexual', 'Heteroflexible', 'Homoflexible', 'Homosexual', 'Lesbian', 'Pansexual', 'Queer', 'Questioning', 'Sapiosexual', 'Sex-repulsed', 'Skoliosexual', 'Spectrasexual', 'Not supplied')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "oriientation" "shibari"."user_oriientation_enum" NOT NULL DEFAULT 'Not supplied'`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_gender_enum" AS ENUM('Agender', 'Androgyne', 'Androgynous', 'Bigender', 'Cis', 'Cisgender', 'Cis Female', 'Cis Male', 'Cis Man', 'Cis Woman', 'Cis gender Female', 'Cis gender Male', 'Cis gender Man', 'Cis gender Woman', 'Female', 'FTM', 'Gender Fluid', 'Gender Nonconforming', 'Gender Questioning', 'Gender Variant', 'Genderqueer', 'Intersex', 'Male', 'MTF', 'Neither', 'Neutrois', 'Non-binary', 'Other', 'Pangender', 'Trans', 'Trans Male', 'Trans Man', 'Trans Person', 'TRANS_Woman', 'Transfeminine', 'Transgender', 'Trans gender Male', 'Trans gender Man', 'Trans gender Person', 'TRANS gender Woman', 'Transmasculine', 'Transsexual', 'Transsexual Male', 'Transsexual Man', 'Transsexual Person', 'Transsexual Woman', 'Two-Spirit', 'Not applicable')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "gender" "shibari"."user_gender_enum" NOT NULL DEFAULT 'Not applicable'`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_pronoun_enum" AS ENUM('he', 'she', 'zie', 'Not applicable')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "pronoun" "shibari"."user_pronoun_enum" NOT NULL DEFAULT 'Not applicable'`);
        await queryRunner.query(`DROP TABLE "shibari"."user-genders"`);
        await queryRunner.query(`DROP TABLE "shibari"."user-roles"`);
        await queryRunner.query(`DROP TABLE "shibari"."user-pronouns"`);
        await queryRunner.query(`DROP TABLE "shibari"."user-orientations"`);
    }

}
