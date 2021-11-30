import {MigrationInterface, QueryRunner} from "typeorm";

export class user2userlogin1624180782095 implements MigrationInterface {
    name = 'user2userlogin1624180782095'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "userLoginId" uuid`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "UQ_58dfa6c626d2a102ebaa688b770" UNIQUE ("userLoginId")`);
        await queryRunner.query(`ALTER TYPE "shibari"."user_location_display_enum" RENAME TO "user_location_display_enum_old"`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_location_display_enum" AS ENUM('No one', 'Friends', 'Other users')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" TYPE "shibari"."user_location_display_enum" USING "location_display"::"text"::"shibari"."user_location_display_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'No one'`);
        await queryRunner.query(`DROP TYPE "shibari"."user_location_display_enum_old"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_58dfa6c626d2a102ebaa688b770" FOREIGN KEY ("userLoginId") REFERENCES "shibari"."user_logins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" DROP CONSTRAINT "FK_11b650c2b19b099af641b22b677"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_58dfa6c626d2a102ebaa688b770"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_location_display_enum_old" AS ENUM('Never', 'Friends', 'Everyone')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" TYPE "shibari"."user_location_display_enum_old" USING "location_display"::"text"::"shibari"."user_location_display_enum_old"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'Never'.user_location_display_enum`);
        await queryRunner.query(`DROP TYPE "shibari"."user_location_display_enum"`);
        await queryRunner.query(`ALTER TYPE "shibari"."user_location_display_enum_old" RENAME TO "user_location_display_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "UQ_58dfa6c626d2a102ebaa688b770"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "userLoginId"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_d9bd1b674337c8ca805460be2ea" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_fetish_map" ADD CONSTRAINT "FK_11b650c2b19b099af641b22b677" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetish"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
