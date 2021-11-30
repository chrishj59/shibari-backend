import { MigrationInterface, QueryRunner } from 'typeorm';

export class userDsRelationship1622404307003 implements MigrationInterface {
  name = 'userDsRelationship1622404307003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "shibari"."user-ds-realtionship" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "relationship" character varying NOT NULL, "seq" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_e95047845af689cf37e0fbcb686" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "dsRelationshipId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP" FOREIGN KEY ("dsRelationshipId") REFERENCES "shibari"."user-ds-realtionship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "dsRelationshipId"`,
    );
    await queryRunner.query(`DROP TABLE "shibari"."user-ds-realtionship"`);
  }
}
