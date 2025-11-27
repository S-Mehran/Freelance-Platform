import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1764262125176 implements MigrationInterface {
    name = 'Users1764262125176'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "freelancers" ("id" SERIAL NOT NULL, "numberOfJobs" integer DEFAULT '0', "fieldOfExpertise" text array NOT NULL DEFAULT ARRAY[]::text[], "status" character varying NOT NULL DEFAULT 'available', "hourlyRate" numeric(10,2) NOT NULL DEFAULT '4.99', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_1672df028678c74fffe28fbb72" UNIQUE ("userId"), CONSTRAINT "PK_2e27ad3c871f34f5d8cfffeb950" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "proposals" ("id" SERIAL NOT NULL, "coverLetter" text NOT NULL, "bidAmount" numeric(10,2) NOT NULL, "bidType" "public"."proposals_bidtype_enum" NOT NULL, "estimatedDeliveryDays" integer NOT NULL, "status" "public"."proposals_status_enum" NOT NULL DEFAULT 'submitted', "attachment" character varying(255), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "postId" integer, "freelancerId" integer, CONSTRAINT "PK_db524c8db8e126a38a2f16d8cac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "summary" character varying, "price" numeric(10,2) NOT NULL, "levelOfExpertiseRequired" "public"."posts_levelofexpertiserequired_enum", "skillsRequired" text, "projectType" "public"."posts_projecttype_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "amountSpent" numeric(10,2) NOT NULL DEFAULT '0', "numberOfHires" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_59c1e5e51addd6ebebf76230b3" UNIQUE ("userId"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "country" character varying NOT NULL DEFAULT 'Pakistan', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "otpCode" character varying, "otpExpiresAt" TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "freelancers" ADD CONSTRAINT "FK_1672df028678c74fffe28fbb723" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposals" ADD CONSTRAINT "FK_580425cba04e59a30892aa6532b" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposals" ADD CONSTRAINT "FK_219edc10f7e4cc15dd19ea5d36d" FOREIGN KEY ("freelancerId") REFERENCES "freelancers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_8c564a41b883ac5bb7d15b9b70e" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_59c1e5e51addd6ebebf76230b37" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_59c1e5e51addd6ebebf76230b37"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_8c564a41b883ac5bb7d15b9b70e"`);
        await queryRunner.query(`ALTER TABLE "proposals" DROP CONSTRAINT "FK_219edc10f7e4cc15dd19ea5d36d"`);
        await queryRunner.query(`ALTER TABLE "proposals" DROP CONSTRAINT "FK_580425cba04e59a30892aa6532b"`);
        await queryRunner.query(`ALTER TABLE "freelancers" DROP CONSTRAINT "FK_1672df028678c74fffe28fbb723"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "clients"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "proposals"`);
        await queryRunner.query(`DROP TABLE "freelancers"`);
    }

}
