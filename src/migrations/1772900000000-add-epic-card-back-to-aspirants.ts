import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEpicCardBackToAspirants1772900000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "aspirants"
      ADD COLUMN IF NOT EXISTS "epicCardBackUrl" text,
      ADD COLUMN IF NOT EXISTS "epicCardBackStatus" varchar DEFAULT 'pending';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "aspirants"
      DROP COLUMN IF EXISTS "epicCardBackUrl",
      DROP COLUMN IF EXISTS "epicCardBackStatus";
    `);
  }
}
