import {MigrationInterface, QueryRunner} from "typeorm";

export class userVisibilityEnum1624301697892 implements MigrationInterface {
    name = 'userVisibilityEnum1624301697892'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_location_display_enum" AS ENUM('N', 'FR', 'ALL')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "location_display" "shibari"."user_location_display_enum" NOT NULL DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "location_display"`);
        await queryRunner.query(`DROP TYPE "shibari"."user_location_display_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
