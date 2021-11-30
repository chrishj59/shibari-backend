import {MigrationInterface, QueryRunner} from "typeorm";

export class userTitleRelation1622314989118 implements MigrationInterface {
    name = 'userTitleRelation1622314989118'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD "titleId" uuid`);
        await queryRunner.query(`ALTER TYPE "shibari"."user_oriientation_enum" RENAME TO "user_oriientation_enum_old"`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_oriientation_enum" AS ENUM('Allosexual', 'Graysexual', 'Gynesexual', 'Heterosexual', 'Heteroflexible', 'Homoflexible', 'Homosexual', 'Lesbian', 'Pansexual', 'Queer', 'Questioning', 'Sapiosexual', 'Sex-repulsed', 'Skoliosexual', 'Spectrasexual', 'Not supplied')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" TYPE "shibari"."user_oriientation_enum" USING "oriientation"::"text"::"shibari"."user_oriientation_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" SET DEFAULT 'Not supplied'`);
        await queryRunner.query(`DROP TYPE "shibari"."user_oriientation_enum_old"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ADD CONSTRAINT "FK_f38670e509f911de73d91cab5bb" FOREIGN KEY ("titleId") REFERENCES "shibari"."user_title"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP CONSTRAINT "FK_f38670e509f911de73d91cab5bb"`);
        await queryRunner.query(`CREATE TYPE "shibari"."user_oriientation_enum_old" AS ENUM('Allosexual', 'Graysexual', 'Gynesexual', 'Heterosexual', 'Heteroflexible', 'Homoflexible', 'Homosexual', 'Lesbian', 'Pansexual', 'Queer', 'Questioning', 'Sapiosexual', 'Sex-repulsed', 'Skoliosexual', 'Spectrasexual', 'Don''t want to say')`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" TYPE "shibari"."user_oriientation_enum_old" USING "oriientation"::"text"::"shibari"."user_oriientation_enum_old"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "oriientation" SET DEFAULT 'Don''t want to say'`);
        await queryRunner.query(`DROP TYPE "shibari"."user_oriientation_enum"`);
        await queryRunner.query(`ALTER TYPE "shibari"."user_oriientation_enum_old" RENAME TO "user_oriientation_enum"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" DROP COLUMN "titleId"`);
    }

}
