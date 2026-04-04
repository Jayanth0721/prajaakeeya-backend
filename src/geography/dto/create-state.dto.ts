import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty({
    description: 'State name',
    example: 'Karnataka'
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    description: 'State code',
    example: 'KA'
  })
  @IsString()
  @IsOptional()
  code?: string;
}
