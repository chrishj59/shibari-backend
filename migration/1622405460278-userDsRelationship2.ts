import { MigrationInterface, QueryRunner } from 'typeorm';

export class userDsRelationship21622405460278 implements MigrationInterface {
  name = 'userDsRelationship21622405460278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP"`,
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
      `ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_USER_USER-DS-RELATIONSHIP" FOREIGN KEY ("dsRelationshipId") REFERENCES "shibari"."user-ds-realtionship"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
