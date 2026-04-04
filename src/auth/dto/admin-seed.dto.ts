import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { LoginDto } from './login.dto';

export class AdminSeedDto extends LoginDto {
  @ApiProperty({ description: 'Optional admin name', example: 'Admin User', required: false })
  @IsOptional()
  @IsString()
  name?: string;
  
  @ApiProperty({ description: 'Password for seeded admin', required: false })
  @IsOptional()
  @IsString()
  password?: string;
}
