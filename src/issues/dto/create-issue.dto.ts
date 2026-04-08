import { IsNotEmpty, IsString, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateIssueDto {
  @ApiProperty({
    description: "Issue title",
    example: "Broken streetlight on 3rd cross",
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiPropertyOptional({
    description: "Detailed description",
    example: "The streetlight has been off for 2 weeks near the park",
  })
  @IsString()
  @IsOptional()
  description?: string;
}
