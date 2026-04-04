import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWardDto {
  @ApiProperty({ description: 'Ward number', example: '42' })
  @IsString()
  @IsNotEmpty()
  number!: string;

  @ApiProperty({ description: 'Ward name', example: 'Jayanagar' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ description: 'Ward category/reservation type', example: 'General (Women)' })
  @IsString()
  @IsOptional()
  category?: string;

  @ApiPropertyOptional({
    description: 'City corporation / municipality this ward belongs to',
    example: 'Greater Bengaluru Authority(GBA) – Bengaluru',
  })
  @IsString()
  @IsOptional()
  municipality?: string;

  @ApiPropertyOptional({ description: 'State name', example: 'Karnataka' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiPropertyOptional({ description: 'Parliamentary constituency name', example: 'Bangalore South' })
  @IsString()
  @IsOptional()
  parliamentary?: string;

  @ApiPropertyOptional({ description: 'Assembly constituency name', example: 'Jayanagar' })
  @IsString()
  @IsOptional()
  assembly?: string;

  @ApiPropertyOptional({ description: 'Zone name', example: 'South Zone' })
  @IsString()
  @IsOptional()
  zone?: string;
}
