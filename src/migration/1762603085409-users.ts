import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1762603085409 implements MigrationInterface {
    name = 'Users1762603085409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "proposals" ("id" SERIAL NOT NULL, "about_yourself" character varying NOT NULL, CONSTRAINT "PK_db524c8db8e126a38a2f16d8cac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "levelofExpertise"`);
        await queryRunner.query(`DROP TYPE "public"."posts_levelofexpertise_enum"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "amount_spent"`);
        await queryRunner.query(`ALTER TABLE "freelancers" DROP COLUMN "mobile"`);
        await queryRunner.query(`ALTER TABLE "freelancers" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "freelancers" DROP COLUMN "jobs"`);
        await queryRunner.query(`CREATE TYPE "public"."posts_levelofexpertiserequired_enum" AS ENUM('entry_level', 'intermediate', 'expert')`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "levelOfExpertiseRequired" "public"."posts_levelofexpertiserequired_enum"`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "amountSpent" numeric(10,2) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "numberOfHires" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD "numberOfJobs" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD "hourlyRate" numeric(10,2) NOT NULL DEFAULT '4.99'`);
        await queryRunner.query(`ALTER TABLE "users" ADD "country" character varying NOT NULL DEFAULT 'Pakistan'`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "projectType" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "freelancers" DROP COLUMN "fieldOfExpertise"`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD "fieldOfExpertise" text array NOT NULL DEFAULT ARRAY[]::text[]`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "freelancers" DROP COLUMN "fieldOfExpertise"`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD "fieldOfExpertise" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "posts" ALTER COLUMN "projectType" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "freelancers" DROP COLUMN "hourlyRate"`);
        await queryRunner.query(`ALTER TABLE "freelancers" DROP COLUMN "numberOfJobs"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "numberOfHires"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "amountSpent"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "levelOfExpertiseRequired"`);
        await queryRunner.query(`DROP TYPE "public"."posts_levelofexpertiserequired_enum"`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD "jobs" integer DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD "mobile" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "amount_spent" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "clients" ADD "mobile" character varying`);
        await queryRunner.query(`CREATE TYPE "public"."posts_levelofexpertise_enum" AS ENUM('entry_level', 'intermediate', 'expert')`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "levelofExpertise" "public"."posts_levelofexpertise_enum" NOT NULL`);
        await queryRunner.query(`DROP TABLE "proposals"`);
    }

}
