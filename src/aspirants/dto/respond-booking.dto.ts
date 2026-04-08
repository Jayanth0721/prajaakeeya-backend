import { IsIn, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RespondBookingDto {
  @ApiProperty({
    description: "Response status: accept or reject",
    example: "accepted",
    enum: ["accepted", "rejected"],
  })
  @IsNotEmpty()
  @IsIn(["accepted", "rejected"])
  status!: "accepted" | "rejected";

  @ApiPropertyOptional({
    description:
      "Scheduled time when accepting (Unix timestamp in milliseconds)",
    example: 1716340000000,
  })
  @IsInt()
  @IsOptional()
  scheduledAt?: number;
}
