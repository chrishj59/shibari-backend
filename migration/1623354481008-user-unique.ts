import {MigrationInterface, QueryRunner} from "typeorm";

export class userUnique1623354481008 implements MigrationInterface {
    name = 'userUnique1623354481008'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user-ds-realtionship" ADD CONSTRAINT "UQ_0c0e77bb844f41be3280b658f2e" UNIQUE ("relationship")`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-genders" ADD CONSTRAINT "UQ_e1aa246641065f1398def76d78f" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-orientations" ADD CONSTRAINT "UQ_e22fd43d11377af9777d731e03b" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-pronouns" ADD CONSTRAINT "UQ_64345e89846c363ab1be882274f" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-roles" ADD CONSTRAINT "UQ_958a2dcbb3e957b37bf4114c6ce" UNIQUE ("roleCode")`);
        await queryRunner.query(`ALTER TABLE "shibari"."fetish" ADD CONSTRAINT "UQ_7c3c1c1fcb389fdd31c3d374dd6" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "UQ_USER_NAMES" UNIQUE ("first_name", "family_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "UQ_USER_NAMES"`);
        await queryRunner.query(`ALTER TABLE "shibari"."fetish" DROP CONSTRAINT "UQ_7c3c1c1fcb389fdd31c3d374dd6"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-roles" DROP CONSTRAINT "UQ_958a2dcbb3e957b37bf4114c6ce"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-pronouns" DROP CONSTRAINT "UQ_64345e89846c363ab1be882274f"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-orientations" DROP CONSTRAINT "UQ_e22fd43d11377af9777d731e03b"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-genders" DROP CONSTRAINT "UQ_e1aa246641065f1398def76d78f"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-ds-realtionship" DROP CONSTRAINT "UQ_0c0e77bb844f41be3280b658f2e"`);
    }

}
