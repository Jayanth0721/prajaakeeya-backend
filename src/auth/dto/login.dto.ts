import { IsString, IsEmail, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "Email address (admin login only)",
    example: "admin@example.com",
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiProperty({
    description: "Optional password for admin login",
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    description: "EPIC ID for voter/aspirant login",
    example: "ABC1234567",
    required: false,
  })
  @IsOptional()
  @IsString()
  epicId?: string;
}
