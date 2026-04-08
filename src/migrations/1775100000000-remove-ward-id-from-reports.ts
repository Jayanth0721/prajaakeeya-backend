import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveWardIdFromReports1775100000000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reports" DROP COLUMN IF EXISTS "ward_id"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "reports" ADD "ward_id" integer`);
  }
}
