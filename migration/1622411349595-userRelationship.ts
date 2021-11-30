import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRelationship1622411349595 implements MigrationInterface {
  name = 'userRelationship1622411349595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP"`,
    );
    await queryRunner.query(
      `CREATE TABLE "shibari"."user-relationship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "relationship" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_USER-RELATIONSHIP" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "relationshipId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP" FOREIGN KEY ("dsRelationshipId") REFERENCES "shibari"."user-ds-realtionship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-RELATIONSHIP" FOREIGN KEY ("relationshipId") REFERENCES "shibari"."user-relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-RELATIONSHIP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "relationshipId"`,
    );
    await queryRunner.query(`DROP TABLE "shibari"."user-relationship"`);
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP" FOREIGN KEY ("dsRelationshipId") REFERENCES "shibari"."user-ds-realtionship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
