import {MigrationInterface, QueryRunner} from "typeorm";

export class addDsRelationship1629968120255 implements MigrationInterface {
    name = 'addDsRelationship1629968120255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."ds-realtionships" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "relationship" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "UQ_DSRELATIONSHIP_RELATIONSHIP" UNIQUE ("relationship"), CONSTRAINT "PK_4e8b1520707f9fee7dad48190d0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."user_dsrelationship_map" ("userId" uuid NOT NULL, "relationshipId" uuid NOT NULL, CONSTRAINT "PK_cfb7c542130cc1d1513a4f71b1b" PRIMARY KEY ("userId", "relationshipId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6c73515d1384b0aae866ffb7fc" ON "shibari"."user_dsrelationship_map" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_bf50460ca72bcd0853547ccb01" ON "shibari"."user_dsrelationship_map" ("relationshipId") `);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_dsrelationship_map" ADD CONSTRAINT "FK_6c73515d1384b0aae866ffb7fc3" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_dsrelationship_map" ADD CONSTRAINT "FK_bf50460ca72bcd0853547ccb01f" FOREIGN KEY ("relationshipId") REFERENCES "shibari"."ds-realtionships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_dsrelationship_map" DROP CONSTRAINT "FK_bf50460ca72bcd0853547ccb01f"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_dsrelationship_map" DROP CONSTRAINT "FK_6c73515d1384b0aae866ffb7fc3"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_bf50460ca72bcd0853547ccb01"`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_6c73515d1384b0aae866ffb7fc"`);
        await queryRunner.query(`DROP TABLE "shibari"."user_dsrelationship_map"`);
        await queryRunner.query(`DROP TABLE "shibari"."ds-realtionships"`);
    }

}
