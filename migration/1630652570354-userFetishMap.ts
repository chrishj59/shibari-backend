import {MigrationInterface, QueryRunner} from "typeorm";

export class userFetishMap1630652570354 implements MigrationInterface {
    name = 'userFetishMap1630652570354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."user-fetish-map" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "give_fetsih" character varying NOT NULL, "receive_fetish" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "userId" uuid, "fetishId" uuid, CONSTRAINT "PK_c1e24117a68d03d13e22ba7c93b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_49588c72ce48bf42ca3736e19a" ON "shibari"."user-fetish-map" ("give_fetsih", "receive_fetish") `);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-fetish-map" ADD CONSTRAINT "FK_8cd61f130af2edc3ec69371a413" FOREIGN KEY ("userId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-fetish-map" ADD CONSTRAINT "FK_748c90c7c8a50f40429315597a9" FOREIGN KEY ("fetishId") REFERENCES "shibari"."fetishes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user-fetish-map" DROP CONSTRAINT "FK_748c90c7c8a50f40429315597a9"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user-fetish-map" DROP CONSTRAINT "FK_8cd61f130af2edc3ec69371a413"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_49588c72ce48bf42ca3736e19a"`);
        await queryRunner.query(`DROP TABLE "shibari"."user-fetish-map"`);
    }

}
