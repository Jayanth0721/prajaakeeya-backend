import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTwitterWhatsappToAspirants1775000000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "aspirants" ADD "twitterLink" text`);
    await queryRunner.query(
      `ALTER TABLE "aspirants" ADD "whatsappNumber" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "aspirants" DROP COLUMN "whatsappNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "aspirants" DROP COLUMN "twitterLink"`,
    );
  }
}
