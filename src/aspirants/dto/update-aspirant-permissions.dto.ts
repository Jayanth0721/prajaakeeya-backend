import { IsBoolean, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateAspirantPermissionsDto {
  @ApiPropertyOptional({
    example: true,
    description: "Allow voters to see phone number",
  })
  @IsBoolean()
  @IsOptional()
  allowPhone?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: "Allow voters to contact via WhatsApp",
  })
  @IsBoolean()
  @IsOptional()
  allowWhatsapp?: boolean;

  @ApiPropertyOptional({ example: true, description: "Allow voters to chat" })
  @IsBoolean()
  @IsOptional()
  allowChat?: boolean;
}
