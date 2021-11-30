import {MigrationInterface, QueryRunner} from "typeorm";

export class useColumnsNullable1624303181326 implements MigrationInterface {
    name = 'useColumnsNullable1624303181326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "category" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "logitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "latitude" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "avitar_data" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "avitar_media_type" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "plan_amount" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "paid_to" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "dob" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "about" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "about" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "dob" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "paid_to" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "plan_amount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "avitar_media_type" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "avitar_data" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "latitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "logitude" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "category" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
