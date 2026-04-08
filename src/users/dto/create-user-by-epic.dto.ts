import { IsString, IsNotEmpty, IsOptional, IsEnum } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserByEpicDto {
  @ApiProperty({
    description: "EPIC number of the voter",
    example: "ABC1234567",
  })
  @IsString()
  @IsNotEmpty()
  epicNumber!: string;

  @ApiProperty({
    description: "Phone number of the user",
    example: "9876543210",
  })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty({
    description: "Role to assign to the user",
    enum: ["voter", "aspirant"],
    example: "voter",
    required: false,
  })
  @IsEnum(["voter", "aspirant"])
  @IsOptional()
  role?: "voter" | "aspirant";
}
