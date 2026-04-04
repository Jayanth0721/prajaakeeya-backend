import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIssueDto {
  @ApiPropertyOptional({ description: 'Issue title', example: 'Fixed title' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ description: 'Detailed description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Whether the issue is active' })
  @IsOptional()
  isActive?: boolean;
}
