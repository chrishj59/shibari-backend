import {MigrationInterface, QueryRunner} from "typeorm";

export class userTitleUnqiue1622365416281 implements MigrationInterface {
    name = 'userTitleUnqiue1622365416281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "shibari"."user_pronoun_enum" RENAME TO "user_pronoun_enum_old"`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_pronoun_enum" AS ENUM('he', 'she', 'zie', 'Not applicable')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "pronoun" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "pronoun" TYPE "shibari"."user_pronoun_enum" USING "pronoun"::"text"::"shibari"."user_pronoun_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "pronoun" SET DEFAULT 'Not applicable'`);
        await queryRunner.query(`DROP TYPE "shibari"."user_pronoun_enum_old"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_title" ADD CONSTRAINT "UQ_fe489c91721655009bcb4b0bc69" UNIQUE ("short_name")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_title" DROP CONSTRAINT "UQ_fe489c91721655009bcb4b0bc69"`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_pronoun_enum_old" AS ENUM('he', 'she', 'zie', 'none')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "pronoun" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "pronoun" TYPE "shibari"."user_pronoun_enum_old" USING "pronoun"::"text"::"shibari"."user_pronoun_enum_old"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "pronoun" SET DEFAULT 'none'`);
        await queryRunner.query(`DROP TYPE "shibari"."user_pronoun_enum"`);
        await queryRunner.query(`ALTER TYPE "shibari"."user_pronoun_enum_old" RENAME TO "user_pronoun_enum"`);
    }

}
