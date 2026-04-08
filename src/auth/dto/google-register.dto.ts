import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class GoogleRegisterDto {
  @ApiProperty({
    description: "Firebase ID token obtained from Google Sign-In",
    example: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFlOWdkay...",
  })
  @IsString()
  @IsNotEmpty()
  idToken!: string;

  @ApiProperty({
    description: "EPIC number (Voter ID)",
    example: "ABC1234567",
  })
  @IsString()
  @IsNotEmpty()
  epicNumber!: string;

  @ApiProperty({
    description:
      "Set to true to confirm registration after fetching voter details",
    example: false,
    required: false,
  })
  @IsOptional()
  confirm?: boolean;
}
