import {MigrationInterface, QueryRunner} from "typeorm";

export class seedFetish1622464145312 implements MigrationInterface {
    name = 'seedFetish1622464145312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-RELATIONSHIP"`);
        await queryRunner.query(`CREATE TABLE "shibari"."fetish" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "seq" integer NOT NULL DEFAULT '0', "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_63956ea9c9b7e2696a595ddac75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."user_fetish_map" ("userId" uuid NOT NULL, "fetishId" uuid NOT NULL, CONSTRAINT "PK_03462674ffbaf418a96aca2027f" PRIMARY KEY ("userId", "fetishId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d9bd1b674337c8ca805460be2e" ON "shibari"."user_fetish_map" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_11b650c2b19b099af641b22b67" ON "shibari"."user_fetish_map" ("fetishId") `);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_97225fe5073324795627407da26" FOREIGN KEY ("dsRelationshipId") REFERENCES "shibari"."user-ds-realtionship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_e69cb9f8fda81e10953a4c10142" FOREIGN KEY ("relationshipId") REFERENCES "shibari"."user-relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_e69cb9f8fda81e10953a4c10142"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_97225fe5073324795627407da26"`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_11b650c2b19b099af641b22b67"`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_d9bd1b674337c8ca805460be2e"`);
        await queryRunner.query(`DROP TABLE "shibari"."user_fetish_map"`);
        await queryRunner.query(`DROP TABLE "shibari"."fetish"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-RELATIONSHIP" FOREIGN KEY ("relationshipId") REFERENCES "shibari"."user-relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP" FOREIGN KEY ("dsRelationshipId") REFERENCES "shibari"."user-ds-realtionship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
