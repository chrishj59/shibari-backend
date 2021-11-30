import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRelationship1629656595250 implements MigrationInterface {
  name = 'userRelationship1629656595250';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //await queryRunner.query(`CREATE TABLE "shibari"."user_relationship_map" ("userId" uuid NOT NULL, "relationshipId" uuid NOT NULL, CONSTRAINT "PK_ba324213e6ff054befc05e1d0cb" PRIMARY KEY ("userId", "relationshipId"))`);
    // await queryRunner.query(
    //   `CREATE INDEX "IDX_9d2ed164bb4e8b3f2a25db9dda" ON "shibari"."user_relationship_map" ("userId") `,
    // );
    // await queryRunner.query(
    //   `CREATE INDEX "IDX_ea7d5282edc581423e1e44d197" ON "shibari"."user_relationship_map" ("relationshipId") `,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "shibari"."user_relationship_map" ADD CONSTRAINT "FK_9d2ed164bb4e8b3f2a25db9dda4" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "shibari"."user_relationship_map" ADD CONSTRAINT "FK_ea7d5282edc581423e1e44d1970" FOREIGN KEY ("relationshipId") REFERENCES "shibari"."relationships"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user_relationship_map" DROP CONSTRAINT "FK_ea7d5282edc581423e1e44d1970"`,
    );
    // await queryRunner.query(
    //   `ALTER TABLE "shibari"."user_relationship_map" DROP CONSTRAINT "FK_9d2ed164bb4e8b3f2a25db9dda4"`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`,
    // );
    // await queryRunner.query(
    //   `ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`,
    // );
    // await queryRunner.query(
    //   `DROP INDEX "shibari"."IDX_ea7d5282edc581423e1e44d197"`,
    // );
    // await queryRunner.query(
    //   `DROP INDEX "shibari"."IDX_9d2ed164bb4e8b3f2a25db9dda"`,
    // );
    // // await queryRunner.query(`DROP TABLE "shibari"."user_relationship_map"`);
  }
}
