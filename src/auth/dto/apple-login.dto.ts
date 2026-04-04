import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AppleLoginDto {
  @ApiProperty({
    description: 'Firebase ID token obtained from Apple Sign-In',
    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOWdkay...',
  })
  @IsString()
  @IsNotEmpty()
  idToken!: string;
}
