import { IsInt, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateVoterDto {
  @ApiPropertyOptional({
    description: 'Serial number from voter list',
    example: '123'
  })
  @IsString()
  @IsOptional()
  slNo?: string;

  @ApiProperty({
    description: 'Full name of the voter',
    example: 'Anita Desai'
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'Name of father/mother/spouse',
    example: 'Ramesh Desai'
  })
  @IsString()
  @IsNotEmpty()
  relativeName!: string;

  @ApiProperty({
    description: 'House number',
    example: '42/A'
  })
  @IsString()
  houseNo!: string;

  @ApiPropertyOptional({
    description: 'Age of the voter',
    example: 35,
    type: 'integer'
  })
  @IsInt()
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Gender of the voter',
    example: 'Female',
    enum: ['Male', 'Female', 'Other']
  })
  @IsString()
  gender!: string;

  @ApiProperty({
    description: 'EPIC number (Voter ID)',
    example: 'XYZ9876543',
    pattern: '[A-Z]{3}\\d{7}'
  })
  @IsString()
  @Matches(/[A-Z]{3}\d{7}/)
  epicNumber!: string;

  @ApiProperty({
    description: 'Ward ID',
    example: 1,
    type: 'integer'
  })
  @IsInt()
  wardId!: number;
}
