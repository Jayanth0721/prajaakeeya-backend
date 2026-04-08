import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTelegramGroupLinkToWards1741500000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wards" ADD COLUMN IF NOT EXISTS "telegram_group_link" VARCHAR NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wards" DROP COLUMN IF EXISTS "telegram_group_link"`,
    );
  }
}
