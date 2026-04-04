import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAspirantDiscussionMessageDto {
  @ApiProperty({
    description: 'Message content for aspirant discussion room',
    example: 'I would like to update you all on the road development progress.',
    maxLength: 5000,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(5000, { message: 'Message content must not exceed 5000 characters' })
  content!: string;
}
