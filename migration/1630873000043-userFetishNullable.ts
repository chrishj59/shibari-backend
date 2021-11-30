import { MigrationInterface, QueryRunner } from 'typeorm';

export class userFetishNullable1630873000043 implements MigrationInterface {
  name = 'userFetishNullable1630873000043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`,
    );

    await queryRunner.query(
      `ALTER TABLE "shibari"."user-fetish-map" ALTER COLUMN "give_fetish" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user-fetish-map" ALTER COLUMN "receive_fetish" DROP NOT NULL`,
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
      `ALTER TABLE "shibari"."user-fetish-map" ALTER COLUMN "give_fetish" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user-fetish-map" ALTER COLUMN "receive_fetish" SET NOT NULL`,
    );
  }
}
