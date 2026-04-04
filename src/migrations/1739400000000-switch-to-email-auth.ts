import { MigrationInterface, QueryRunner } from "typeorm";

export class SwitchToEmailAuth1739400000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add email column to users table
        await queryRunner.query(`
            ALTER TABLE "users" ADD COLUMN "email" VARCHAR
        `);

        // Make phone nullable
        await queryRunner.query(`
            ALTER TABLE "users" ALTER COLUMN "phone" DROP NOT NULL
        `);

        // Drop the unique constraint on phone
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "UQ_a000cca60bcf04454e727699490"
        `);

        // Add unique constraint on email
        await queryRunner.query(`
            ALTER TABLE "users" ADD CONSTRAINT "UQ_user_email" UNIQUE ("email")
        `);

        // Add email column to otps table
        await queryRunner.query(`
            ALTER TABLE "otps" ADD COLUMN "email" VARCHAR
        `);

        // Copy phone to email in otps table (for existing records)
        await queryRunner.query(`
            UPDATE "otps" SET "email" = "phone" WHERE "email" IS NULL
        `);

        // Make email NOT NULL in otps table
        await queryRunner.query(`
            ALTER TABLE "otps" ALTER COLUMN "email" SET NOT NULL
        `);

        // Drop the index on phone in otps table
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_4a8362f0b89f0fa01f40066e7d"
        `);

        // Create index on email in otps table
        await queryRunner.query(`
            CREATE INDEX "IDX_otp_email" ON "otps" ("email")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove email column from users table
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT IF EXISTS "UQ_user_email"
        `);

        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);

        // Make phone NOT NULL again
        await queryRunner.query(`
            ALTER TABLE "users" ALTER COLUMN "phone" SET NOT NULL
        `);

        // Add back unique constraint on phone
        await queryRunner.query(`
            ALTER TABLE "users" ADD CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone")
        `);

        // Drop the index on email in otps table
        await queryRunner.query(`
            DROP INDEX IF EXISTS "IDX_otp_email"
        `);

        // Create index on phone in otps table
        await queryRunner.query(`
            CREATE INDEX "IDX_4a8362f0b89f0fa01f40066e7d" ON "otps" ("phone")
        `);

        // Remove email column from otps table
        await queryRunner.query(`
            ALTER TABLE "otps" DROP COLUMN "email"
        `);
    }
}
