import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyAspirantRegistrationDto {
  @ApiProperty({ description: 'Verification ID returned when aspirant profile was submitted', example: 'abc123xyz' })
  @IsString()
  @IsNotEmpty()
  verificationId!: string;

  @ApiProperty({ description: 'OTP code received via SMS', example: '123456' })
  @IsString()
  @MinLength(4)
  code!: string;
}
