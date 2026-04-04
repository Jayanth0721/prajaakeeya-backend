import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Message content for the ward forum',
    example: 'Hello everyone in our ward! Looking forward to working together.',
    maxLength: 5000,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000, { message: 'Message content must not exceed 5000 characters' })
  content!: string;
}
