import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsActiveToAspirants1741240000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "aspirants"
      ADD COLUMN IF NOT EXISTS "isActive" boolean NOT NULL DEFAULT true;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "aspirants"
      DROP COLUMN IF EXISTS "isActive";
    `);
  }
}
