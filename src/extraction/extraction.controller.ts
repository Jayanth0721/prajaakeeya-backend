import { Controller, Param, Post, UseGuards } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { ExtractionService } from "./extraction.service";

@ApiTags("Extraction")
@Controller("extract")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class ExtractionController {
  constructor(private readonly extractionService: ExtractionService) {}

  @Post(":wardId")
  @ApiOperation({ summary: "Trigger PDF extraction for a ward" })
  @ApiParam({
    name: "wardId",
    type: "number",
    description: "Ward ID",
    example: 1,
  })
  @ApiResponse({
    status: 201,
    description: "Extraction triggered successfully",
  })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  trigger(@Param("wardId") wardId: number) {
    return this.extractionService.trigger(Number(wardId));
  }
}
