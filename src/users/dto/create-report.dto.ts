import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateReportDto {
  @ApiProperty({
    description: "ID of the user being reported",
    example: 123,
  })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  reportedUserId!: number;

  @ApiProperty({
    description: "Type of user being reported",
    enum: ["voter", "aspirant"],
    example: "voter",
  })
  @IsEnum(["voter", "aspirant"])
  @IsNotEmpty()
  reportedUserType!: "voter" | "aspirant";

  @ApiProperty({
    description: "Reason for reporting",
    example: "This user is suspicious or violating rules",
  })
  @IsString()
  @IsNotEmpty()
  reason!: string;
}
