import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRelationshipsUnique1622413419660
  implements MigrationInterface
{
  name = 'userRelationshipsUnique1622413419660';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-RELATIONSHIP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user-relationship" ADD CONSTRAINT "UQ_USER-RELATIONSHIP_RELATIONSHIP" UNIQUE ("relationship")`,
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
      `ALTER TABLE "shibari"."user-relationship" DROP CONSTRAINT "UQ_USER-RELATIONSHIP_RELATIONSHIP"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-RELATIONSHIP" FOREIGN KEY ("relationshipId") REFERENCES "shibari"."user-relationship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP" FOREIGN KEY ("dsRelationshipId") REFERENCES "shibari"."user-ds-realtionship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
