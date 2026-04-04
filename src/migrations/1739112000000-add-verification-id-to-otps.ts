import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddVerificationIdToOtps1739112000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add verificationId column to otps table
    await queryRunner.addColumn(
      'otps',
      new TableColumn({
        name: 'verificationId',
        type: 'varchar',
        isNullable: true,
      })
    );

    // Update OtpPurpose enum to include 'login' and 'vote'
    await queryRunner.query(`
      ALTER TABLE otps 
      DROP CONSTRAINT IF EXISTS "CHK_otps_purpose";
    `);
    
    await queryRunner.query(`
      ALTER TABLE otps 
      ADD CONSTRAINT "CHK_otps_purpose" 
      CHECK (purpose IN ('register', 'login', 'vote'));
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove the constraint
    await queryRunner.query(`
      ALTER TABLE otps 
      DROP CONSTRAINT IF EXISTS "CHK_otps_purpose";
    `);

    // Restore old constraint
    await queryRunner.query(`
      ALTER TABLE otps 
      ADD CONSTRAINT "CHK_otps_purpose" 
      CHECK (purpose IN ('register'));
    `);

    // Drop verificationId column
    await queryRunner.dropColumn('otps', 'verificationId');
  }
}
