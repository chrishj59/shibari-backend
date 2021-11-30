import {MigrationInterface, QueryRunner} from "typeorm";

export class ukTownUniquw1622674352968 implements MigrationInterface {
    name = 'ukTownUniquw1622674352968'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."uk-town" DROP CONSTRAINT "UQ_b2153ccec13a0c63b888a61199b"`);
        await queryRunner.query(`ALTER TABLE "shibari"."uk-town" ADD CONSTRAINT "UQ_uk-town" UNIQUE ("place", "county", "country", "post-code", "gridRef")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."uk-town" DROP CONSTRAINT "UQ_uk-town"`);
        await queryRunner.query(`ALTER TABLE "shibari"."uk-town" ADD CONSTRAINT "UQ_b2153ccec13a0c63b888a61199b" UNIQUE ("place")`);
    }

}
