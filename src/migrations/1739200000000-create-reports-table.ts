import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateReportsTable1739200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "reports",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
          {
            name: "reported_user_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "reported_by_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "ward_id",
            type: "int",
            isNullable: false,
          },
          {
            name: "reported_user_type",
            type: "varchar",
            length: "20",
            isNullable: false,
          },
          {
            name: "reason",
            type: "text",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "20",
            default: "'pending'",
          },
          {
            name: "admin_notes",
            type: "text",
            isNullable: true,
          },
          {
            name: "resolved_at",
            type: "timestamp",
            isNullable: true,
          },
          {
            name: "resolved_by_id",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Add foreign key for reported_user_id
    await queryRunner.createForeignKey(
      "reports",
      new TableForeignKey({
        columnNames: ["reported_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );

    // Add foreign key for reported_by_id
    await queryRunner.createForeignKey(
      "reports",
      new TableForeignKey({
        columnNames: ["reported_by_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      }),
    );

    // Add foreign key for ward_id
    await queryRunner.createForeignKey(
      "reports",
      new TableForeignKey({
        columnNames: ["ward_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "wards",
        onDelete: "CASCADE",
      }),
    );

    // Add foreign key for resolved_by_id
    await queryRunner.createForeignKey(
      "reports",
      new TableForeignKey({
        columnNames: ["resolved_by_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("reports");
  }
}
