import {MigrationInterface, QueryRunner} from "typeorm";

export class userFriends1625382940665 implements MigrationInterface {
    name = 'userFriends1625382940665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."user_followers_map" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_82963acab07e06b8cb47547c116" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_da07a95b63a4b5fe662a81903a" ON "shibari"."user_followers_map" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_a05bb9b16a78f3d6ece0441831" ON "shibari"."user_followers_map" ("userId_2") `);
        await queryRunner.query(`CREATE TABLE "shibari"."user_friends_maps" ("userId_1" uuid NOT NULL, "userId_2" uuid NOT NULL, CONSTRAINT "PK_bb9b57832781cf55957654879f7" PRIMARY KEY ("userId_1", "userId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_94cc13b56dc08370eb67273b26" ON "shibari"."user_friends_maps" ("userId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_fa04e1c6a3347619b98fc103cc" ON "shibari"."user_friends_maps" ("userId_2") `);
        await queryRunner.query(`ALTER TABLE "shibari"."relationships" ALTER COLUMN "hasOtherPerson" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_followers_map" ADD CONSTRAINT "FK_da07a95b63a4b5fe662a81903a2" FOREIGN KEY ("userId_1") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_followers_map" ADD CONSTRAINT "FK_a05bb9b16a78f3d6ece04418311" FOREIGN KEY ("userId_2") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_friends_maps" ADD CONSTRAINT "FK_94cc13b56dc08370eb67273b26c" FOREIGN KEY ("userId_1") REFERENCES "shibari"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_friends_maps" ADD CONSTRAINT "FK_fa04e1c6a3347619b98fc103cc6" FOREIGN KEY ("userId_2") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."user_friends_maps" DROP CONSTRAINT "FK_fa04e1c6a3347619b98fc103cc6"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_friends_maps" DROP CONSTRAINT "FK_94cc13b56dc08370eb67273b26c"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_followers_map" DROP CONSTRAINT "FK_a05bb9b16a78f3d6ece04418311"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_followers_map" DROP CONSTRAINT "FK_da07a95b63a4b5fe662a81903a2"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."relationships" ALTER COLUMN "hasOtherPerson" DROP DEFAULT`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_fa04e1c6a3347619b98fc103cc"`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_94cc13b56dc08370eb67273b26"`);
        await queryRunner.query(`DROP TABLE "shibari"."user_friends_maps"`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_a05bb9b16a78f3d6ece0441831"`);
        await queryRunner.query(`DROP INDEX "shibari"."IDX_da07a95b63a4b5fe662a81903a"`);
        await queryRunner.query(`DROP TABLE "shibari"."user_followers_map"`);
    }

}
