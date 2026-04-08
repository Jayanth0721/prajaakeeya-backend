import { IsEnum, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateReportStatusDto {
  @ApiProperty({
    description: "Status of the report",
    enum: ["pending", "resolved", "rejected"],
    example: "resolved",
  })
  @IsEnum(["pending", "resolved", "rejected"])
  status!: "pending" | "resolved" | "rejected";

  @ApiProperty({
    description: "Admin notes about the resolution",
    example: "Verified and corrected ward assignment",
    required: false,
  })
  @IsString()
  @IsOptional()
  adminNotes?: string;
}
