import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterVoterDto {
  @ApiProperty({
    description: "Full name of the voter",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    description: "Firebase ID token obtained from Google Sign-In",
    example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOWdkay...",
  })
  @IsString()
  @IsNotEmpty()
  idToken!: string;
}
