import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserEnum1622311073265 implements MigrationInterface {
  name = 'UserEnum1622311073265';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "shibari"."user_pronoun_enum" AS ENUM('he', 'she', 'zie', 'none')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "pronoun" "shibari"."user_pronoun_enum" NOT NULL DEFAULT 'none'`,
    );
    await queryRunner.query(
      `CREATE TYPE "shibari"."user_gender_enum" AS ENUM('Agender', 'Androgyne', 'Androgynous', 'Bigender', 'Cis', 'Cisgender', 'Cis Female', 'Cis Male', 'Cis Man', 'Cis Woman', 'Cis gender Female', 'Cis gender Male', 'Cis gender Man', 'Cis gender Woman', 'Female', 'FTM', 'Gender Fluid', 'Gender Nonconforming', 'Gender Questioning', 'Gender Variant', 'Genderqueer', 'Intersex', 'Male', 'MTF', 'Neither', 'Neutrois', 'Non-binary', 'Other', 'Pangender', 'Trans', 'Trans Male', 'Trans Man', 'Trans Person', 'TRANS_Woman', 'Transfeminine', 'Transgender', 'Trans gender Male', 'Trans gender Man', 'Trans gender Person', 'TRANS gender Woman', 'Transmasculine', 'Transsexual', 'Transsexual Male', 'Transsexual Man', 'Transsexual Person', 'Transsexual Woman', 'Two-Spirit', 'Not applicable')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "gender" "shibari"."user_gender_enum" NOT NULL DEFAULT 'Not applicable'`,
    );
    await queryRunner.query(
      `CREATE TYPE "shibari"."user_oriientation_enum" AS ENUM('Allosexual', 'Graysexual', 'Gynesexual', 'Heterosexual', 'Heteroflexible', 'Homoflexible', 'Homosexual', 'Lesbian', 'Pansexual', 'Queer', 'Questioning', 'Sapiosexual', 'Sex-repulsed', 'Skoliosexual', 'Spectrasexual', 'Don''t want to say')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "oriientation" "shibari"."user_oriientation_enum" NOT NULL DEFAULT 'Don''t want to say'`,
    );
    await queryRunner.query(
      `CREATE TYPE "shibari"."user_location_display_enum" AS ENUM('Never', 'Friends', 'Everyone')`,
    );
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" ADD "location_display" "shibari"."user_location_display_enum" NOT NULL DEFAULT 'Never'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "location_display"`,
    );
    await queryRunner.query(`DROP TYPE "shibari"."user_location_display_enum"`);
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "oriientation"`,
    );
    await queryRunner.query(`DROP TYPE "shibari"."user_oriientation_enum"`);
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "gender"`,
    );
    await queryRunner.query(`DROP TYPE "shibari"."user_gender_enum"`);
    await queryRunner.query(
      `ALTER TABLE "shibari"."user" DROP COLUMN "pronoun"`,
    );
    await queryRunner.query(`DROP TYPE "shibari"."user_pronoun_enum"`);
  }
}
