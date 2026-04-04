import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssemblyDto {
  @ApiProperty({
    description: 'Assembly constituency name',
    example: 'Jayanagar'
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: 'State name',
    example: 'Karnataka'
  })
  @IsString()
  @IsNotEmpty()
  state!: string;

  @ApiProperty({
    description: 'Parliamentary constituency name',
    example: 'Bangalore South'
  })
  @IsString()
  @IsNotEmpty()
  parliamentary!: string;
}
