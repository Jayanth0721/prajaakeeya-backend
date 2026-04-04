import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMediaUploadFeatures1739300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add profile picture to users table
    await queryRunner.query(`
      ALTER TABLE "users" 
      ADD COLUMN "profile_picture" text;
    `);

    // Add document fields to aspirants table
    await queryRunner.query(`
      ALTER TABLE "aspirants"
      ADD COLUMN "sopUrl" text,
      ADD COLUMN "sopStatus" varchar DEFAULT 'pending',
      ADD COLUMN "agreementUrl" text,
      ADD COLUMN "agreementStatus" varchar DEFAULT 'pending',
      ADD COLUMN "propertyDeclarationUrl" text,
      ADD COLUMN "propertyDeclarationStatus" varchar DEFAULT 'pending',
      ADD COLUMN "codeOfConductUrl" text,
      ADD COLUMN "codeOfConductStatus" varchar DEFAULT 'pending',
      ADD COLUMN "resumeUrl" text,
      ADD COLUMN "resumeStatus" varchar DEFAULT 'pending',
      ADD COLUMN "epicCardUrl" text,
      ADD COLUMN "epicCardStatus" varchar DEFAULT 'pending',
      ADD COLUMN "addressProofUrl" text,
      ADD COLUMN "addressProofStatus" varchar DEFAULT 'pending',
      ADD COLUMN "recentPhotoUrl" text,
      ADD COLUMN "recentPhotoStatus" varchar DEFAULT 'pending',
      ADD COLUMN "selfieUrl" text,
      ADD COLUMN "selfieStatus" varchar DEFAULT 'pending',
      ADD COLUMN "rejectionReasons" text;
    `);

    // Create admin_documents table
    await queryRunner.query(`
      CREATE TABLE "admin_documents" (
        "id" SERIAL PRIMARY KEY,
        "documentType" varchar NOT NULL,
        "documentUrl" text NOT NULL,
        "version" varchar,
        "description" text,
        "isActive" boolean DEFAULT true,
        "createdAt" timestamp DEFAULT now(),
        "updatedAt" timestamp DEFAULT now()
      );
    `);

    // Create user_signed_documents table
    await queryRunner.query(`
      CREATE TABLE "user_signed_documents" (
        "id" SERIAL PRIMARY KEY,
        "userId" integer NOT NULL,
        "adminDocumentId" integer NOT NULL,
        "signedDocumentUrl" text,
        "status" varchar DEFAULT 'pending',
        "rejectionReason" text,
        "signedAt" timestamp,
        "verifiedAt" timestamp,
        "createdAt" timestamp DEFAULT now(),
        "updatedAt" timestamp DEFAULT now(),
        FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
        FOREIGN KEY ("adminDocumentId") REFERENCES "admin_documents"("id") ON DELETE CASCADE
      );
    `);

    // Create indexes
    await queryRunner.query(`
      CREATE INDEX "idx_admin_documents_type_active" 
      ON "admin_documents" ("documentType", "isActive");
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_user_signed_documents_user" 
      ON "user_signed_documents" ("userId");
    `);

    await queryRunner.query(`
      CREATE INDEX "idx_user_signed_documents_status" 
      ON "user_signed_documents" ("status");
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_user_signed_documents_status";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_user_signed_documents_user";`);
    await queryRunner.query(`DROP INDEX IF EXISTS "idx_admin_documents_type_active";`);

    // Drop tables
    await queryRunner.query(`DROP TABLE IF EXISTS "user_signed_documents";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "admin_documents";`);

    // Remove columns from aspirants
    await queryRunner.query(`
      ALTER TABLE "aspirants"
      DROP COLUMN IF EXISTS "rejectionReasons",
      DROP COLUMN IF EXISTS "selfieStatus",
      DROP COLUMN IF EXISTS "selfieUrl",
      DROP COLUMN IF EXISTS "recentPhotoStatus",
      DROP COLUMN IF EXISTS "recentPhotoUrl",
      DROP COLUMN IF EXISTS "addressProofStatus",
      DROP COLUMN IF EXISTS "addressProofUrl",
      DROP COLUMN IF EXISTS "epicCardStatus",
      DROP COLUMN IF EXISTS "epicCardUrl",
      DROP COLUMN IF EXISTS "resumeStatus",
      DROP COLUMN IF EXISTS "resumeUrl",
      DROP COLUMN IF EXISTS "codeOfConductStatus",
      DROP COLUMN IF EXISTS "codeOfConductUrl",
      DROP COLUMN IF EXISTS "propertyDeclarationStatus",
      DROP COLUMN IF EXISTS "propertyDeclarationUrl",
      DROP COLUMN IF EXISTS "agreementStatus",
      DROP COLUMN IF EXISTS "agreementUrl",
      DROP COLUMN IF EXISTS "sopStatus",
      DROP COLUMN IF EXISTS "sopUrl";
    `);

    // Remove column from users
    await queryRunner.query(`
      ALTER TABLE "users" 
      DROP COLUMN IF EXISTS "profile_picture";
    `);
  }
}
