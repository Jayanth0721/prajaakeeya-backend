import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePendingAspirantRegistrationsTable1774000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "pending_aspirant_registrations" (
        "id" SERIAL PRIMARY KEY,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now(),
        "userId" INTEGER NOT NULL UNIQUE,
        "phone" VARCHAR NOT NULL,
        "verificationId" VARCHAR NOT NULL,
        "data" TEXT NOT NULL,
        "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "pending_aspirant_registrations"`);
  }
}
