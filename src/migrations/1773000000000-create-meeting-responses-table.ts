import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMeetingResponsesTable1773000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "meeting_responses" (
        "id" SERIAL PRIMARY KEY,
        "createdAt" TIMESTAMP DEFAULT now(),
        "updatedAt" TIMESTAMP DEFAULT now(),
        "meetingId" INTEGER NOT NULL REFERENCES "aspirant_meetings"("id") ON DELETE CASCADE,
        "voterId" INTEGER NOT NULL,
        "attending" BOOLEAN NOT NULL,
        UNIQUE ("meetingId", "voterId")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "meeting_responses"`);
  }
}
