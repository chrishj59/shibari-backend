import {MigrationInterface, QueryRunner} from "typeorm";

export class activity1632916747340 implements MigrationInterface {
    name = 'activity1632916747340'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "shibari"."comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "comment_body" character varying NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "createdById" uuid, "activityId" uuid, "likeId" uuid, CONSTRAINT "PK_e48fb094b4eff3a6a6bd0e5419e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "shibari"."activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "tag-line" character varying NOT NULL, "description" character varying NOT NULL, "cost" numeric(13,2) NOT NULL DEFAULT '0', "dress-code" character varying, "starts-at" TIMESTAMP NOT NULL, "ends-at" TIMESTAMP NOT NULL, "county-name" character varying, "city-name" character varying, "city-id" character varying, "latitude" numeric(8,4), "longitude" numeric(8,4), "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, "ownerId" uuid, CONSTRAINT "PK_df8d29ce6c6d327c6cfaf91e376" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'`);
        await queryRunner.query(`ALTER TABLE "shibari"."likes-map" ADD CONSTRAINT "FK_3253c12170ab94d4a75ea9486d5" FOREIGN KEY ("likeCommentId") REFERENCES "shibari"."comments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."comments" ADD CONSTRAINT "FK_f7d65388fdb442204434c4145fc" FOREIGN KEY ("createdById") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."comments" ADD CONSTRAINT "FK_1eeedc565929f0273eea930c391" FOREIGN KEY ("activityId") REFERENCES "shibari"."activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."comments" ADD CONSTRAINT "FK_2de0cd549f918bb03494cc188d5" FOREIGN KEY ("likeId") REFERENCES "shibari"."likes-map"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "shibari"."activities" ADD CONSTRAINT "FK_a69f93dd983412c7c9cd1b9e54b" FOREIGN KEY ("ownerId") REFERENCES "shibari"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "shibari"."activities" DROP CONSTRAINT "FK_a69f93dd983412c7c9cd1b9e54b"`);
        await queryRunner.query(`ALTER TABLE "shibari"."comments" DROP CONSTRAINT "FK_2de0cd549f918bb03494cc188d5"`);
        await queryRunner.query(`ALTER TABLE "shibari"."comments" DROP CONSTRAINT "FK_1eeedc565929f0273eea930c391"`);
        await queryRunner.query(`ALTER TABLE "shibari"."comments" DROP CONSTRAINT "FK_f7d65388fdb442204434c4145fc"`);
        await queryRunner.query(`ALTER TABLE "shibari"."likes-map" DROP CONSTRAINT "FK_3253c12170ab94d4a75ea9486d5"`);
        await queryRunner.query(`ALTER TABLE "shibari"."user" ALTER COLUMN "location_display" SET DEFAULT 'N'.user_location_display_enum`);
        await queryRunner.query(`ALTER TABLE "shibari"."user_logins" ALTER COLUMN "role" SET DEFAULT 'free'.user_logins_role_enum`);
        await queryRunner.query(`DROP TABLE "shibari"."activities"`);
        await queryRunner.query(`DROP TABLE "shibari"."comments"`);
    }

}
