import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { VerificationService } from './verification.service';

@ApiTags('Verification')
@Controller('verification')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get('epic/:epic')
  @ApiOperation({ summary: 'Verify EPIC number' })
  @ApiParam({ name: 'epic', type: 'string', description: 'EPIC ID to verify', example: 'ABC1234567' })
  @ApiResponse({ status: 200, description: 'EPIC verification result' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  verifyEpic(@Param('epic') epic: string) {
    return this.verificationService.verifyEpic(epic);
  }
}
