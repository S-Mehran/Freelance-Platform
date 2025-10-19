import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1760874287327 implements MigrationInterface {
    name = 'Users1760874287327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."posts_levelofexpertise_enum" AS ENUM('entry_level', 'intermediate', 'expert')`);
        await queryRunner.query(`CREATE TYPE "public"."posts_projecttype_enum" AS ENUM('one_time_project', 'ongoing_project', 'not_sure')`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "summary" character varying, "price" numeric(10,2) NOT NULL, "levelofExpertise" "public"."posts_levelofexpertise_enum" NOT NULL, "skillsRequired" text, "projectType" "public"."posts_projecttype_enum", "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_8c564a41b883ac5bb7d15b9b70e" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_8c564a41b883ac5bb7d15b9b70e"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TYPE "public"."posts_projecttype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."posts_levelofexpertise_enum"`);
    }

}
