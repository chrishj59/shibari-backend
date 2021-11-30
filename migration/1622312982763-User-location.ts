import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLocation1622312982763 implements MigrationInterface {
  name = 'UserLocation1622312982763';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "location" geometry(Point,4326)`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" SET DEFAULT 'Don''t want to say'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" SET DEFAULT 'Don''t want to say'`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "location"`,
    );
  }
}
