import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyEpicDto {
  @ApiProperty({
    description: 'EPIC number of the voter',
    example: 'ABC1234567',
  })
  @IsString()
  @IsNotEmpty()
  epicNumber!: string;
}
