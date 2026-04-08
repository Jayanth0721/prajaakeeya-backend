import { IsInt, IsString, Matches, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyVoteOtpDto {
  @ApiProperty({
    description: "ID of the ward",
    example: 1,
    type: "integer",
  })
  @IsInt()
  wardId!: number;

  @ApiProperty({
    description: "ID of the aspirant to vote for",
    example: 5,
    type: "integer",
  })
  @IsInt()
  aspirantId!: number;

  @ApiProperty({
    description: "OTP code received via email (4-6 digits)",
    example: "123456",
    pattern: "^\\d{4,6}$",
  })
  @IsString()
  @Matches(/^\d{4,6}$/)
  otp!: string;

  @ApiProperty({
    description:
      "Verification ID received when OTP was sent (optional, for additional validation)",
    example: "5040166",
    required: false,
  })
  @IsString()
  @IsOptional()
  verificationId?: string;
}
