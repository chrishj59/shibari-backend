import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRelationshipCount1629662606966 implements MigrationInterface {
  name = 'userRelationshipCount1629662606966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "num_relationships" integer DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "num_relationships"`,
    );
  }
}
