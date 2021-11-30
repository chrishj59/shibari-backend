import {MigrationInterface, QueryRunner} from "typeorm";

export class userRelationships1625207887709 implements MigrationInterface {
    name = 'userRelationships1625207887709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_e69cb9f8fda81e10953a4c10142"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`CREATE TABLE "shibari"."user_relationship_map" ("userId" uuid NOT NULL, "relationshipsId" uuid NOT NULL, CONSTRAINT "PK_005bd36852cefb7588b384a54d0" PRIMARY KEY ("userId", "relationshipsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d2ed164bb4e8b3f2a25db9dda" ON "shibari"."user_relationship_map" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9cac4b9a3de9fd380f043ee325" ON "shibari"."user_relationship_map" ("relationshipsId") `);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "relationshipId"`);
        await queryRunner.query(`ALTER TABLE "shibari"."relationships" ADD "hasOtherPerson" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_relationship_map" ADD CONSTRAINT "FK_9d2ed164bb4e8b3f2a25db9dda4" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_relationship_map" ADD CONSTRAINT "FK_9cac4b9a3de9fd380f043ee325b" FOREIGN KEY ("relationshipsId") REFERENCES "shibari"."relationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_relationship_map" DROP CONSTRAINT "FK_9cac4b9a3de9fd380f043ee325b"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_relationship_map" DROP CONSTRAINT "FK_9d2ed164bb4e8b3f2a25db9dda4"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."relationships" DROP COLUMN "hasOtherPerson"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "relationshipId" uuid`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_9cac4b9a3de9fd380f043ee325"`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_9d2ed164bb4e8b3f2a25db9dda"`);
        await queryRunner.query(`DROP TABLE "shibari"."user_relationship_map"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_e69cb9f8fda81e10953a4c10142" FOREIGN KEY ("relationshipId") REFERENCES "shibari"."relationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
