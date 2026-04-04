import { IsInt, IsString, IsOptional, Matches, ValidateIf } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateAspirantDto {
  @ApiPropertyOptional({ example: 45 })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  age?: number;

  @ApiPropertyOptional({ example: 'Male' })
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional({ example: 'M.A. Public Administration' })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiPropertyOptional({ example: 'Social activist' })
  @IsString()
  @IsOptional()
  occupation?: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.phone !== '' && o.phone != null)
  @Matches(/^[6-9]\d{9}$/, { message: 'phone must be a valid 10-digit Indian mobile number' })
  phone?: string;

  @ApiPropertyOptional({ example: '123 MG Road, Ward 42, Bengaluru, Karnataka' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ example: 'Better roads and clean water for all' })
  @IsString()
  @IsOptional()
  manifesto?: string;

  @ApiPropertyOptional({ example: 'https://instagram.com/priyasharma' })
  @IsString()
  @IsOptional()
  instagramLink?: string;

  @ApiPropertyOptional({ example: 'https://facebook.com/priyasharma' })
  @IsString()
  @IsOptional()
  facebookLink?: string;

  @ApiPropertyOptional({ example: 'https://linkedin.com/in/priyasharma' })
  @IsString()
  @IsOptional()
  linkedinLink?: string;

  @ApiPropertyOptional({ example: 'https://twitter.com/priyasharma' })
  @IsString()
  @IsOptional()
  twitterLink?: string;

  @ApiPropertyOptional({ example: '9876543210' })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.whatsappNumber !== '' && o.whatsappNumber != null)
  @Matches(/^[6-9]\d{9}$/, { message: 'whatsappNumber must be a valid 10-digit Indian mobile number' })
  whatsappNumber?: string;
}
