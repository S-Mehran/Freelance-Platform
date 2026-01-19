import { MigrationInterface, QueryRunner } from "typeorm";

export class Users1768816976724 implements MigrationInterface {
    name = 'Users1768816976724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contracts_status_enum" AS ENUM('pending', 'active', 'cancelled', 'completed')`);
        await queryRunner.query(`CREATE TABLE "contracts" ("id" SERIAL NOT NULL, "post_id" integer NOT NULL, "freelancer_id" integer NOT NULL, "client_id" integer NOT NULL, "proposal_id" integer NOT NULL, "status" "public"."contracts_status_enum" NOT NULL DEFAULT 'pending', "agreedPrice" numeric(10,2) NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "REL_be959b9885c294c5b4bf287ac5" UNIQUE ("proposal_id"), CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "freelancers" ALTER COLUMN "fieldOfExpertise" SET DEFAULT ARRAY[]::text[]`);
        await queryRunner.query(`ALTER TABLE "freelancers" ALTER COLUMN "hourlyRate" SET DEFAULT '4.99'`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_6abd6ec827804cf22717e152014" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_a94ffd0b1a052fddaa84d4cb186" FOREIGN KEY ("freelancer_id") REFERENCES "freelancers"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_9945462ca96b2c7d0a97e012cdc" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_be959b9885c294c5b4bf287ac5a" FOREIGN KEY ("proposal_id") REFERENCES "proposals"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_be959b9885c294c5b4bf287ac5a"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_9945462ca96b2c7d0a97e012cdc"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_a94ffd0b1a052fddaa84d4cb186"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_6abd6ec827804cf22717e152014"`);
        await queryRunner.query(`ALTER TABLE "freelancers" ALTER COLUMN "hourlyRate" SET DEFAULT 4.99`);
        await queryRunner.query(`ALTER TABLE "freelancers" ALTER COLUMN "fieldOfExpertise" SET DEFAULT ARRAY[]`);
        await queryRunner.query(`DROP TABLE "contracts"`);
        await queryRunner.query(`DROP TYPE "public"."contracts_status_enum"`);
    }

}
