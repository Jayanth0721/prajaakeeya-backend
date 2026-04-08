import { IsString, IsEmail, Matches, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class VerifyOtpDto {
  @ApiProperty({
    description: "Email address",
    example: "user@example.com",
  })
  @IsString()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: "OTP code (4-6 digits)",
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
