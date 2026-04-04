import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAspirantMessageDto {
  @ApiProperty({
    description: "Message content for aspirant's chat room",
    example: 'I have a question about your manifesto item on roads.',
    maxLength: 5000,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000)
  content!: string;
}
