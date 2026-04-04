import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AspirantSendOtpDto {
  @ApiProperty({ description: '10-digit mobile number', example: '9876543210' })
  @IsString()
  @Matches(/^[6-9]\d{9}$/, { message: 'mobileNumber must be a valid 10-digit Indian mobile number' })
  mobileNumber!: string;
}
