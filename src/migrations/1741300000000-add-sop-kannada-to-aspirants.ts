import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSopKannadaToAspirants1741300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE aspirants
        ADD COLUMN IF NOT EXISTS "sopKannadaUrl" text,
        ADD COLUMN IF NOT EXISTS "sopKannadaStatus" varchar NOT NULL DEFAULT 'pending'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE aspirants
        DROP COLUMN IF EXISTS "sopKannadaUrl",
        DROP COLUMN IF EXISTS "sopKannadaStatus"
    `);
  }
}
