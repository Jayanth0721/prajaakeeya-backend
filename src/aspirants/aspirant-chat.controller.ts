import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AspirantChatService } from "./aspirant-chat.service";
import { CreateAspirantMessageDto } from "./dto/create-aspirant-message.dto";
import { GetAspirantMessagesDto } from "./dto/get-aspirant-messages.dto";

@ApiTags("Aspirant Chat")
@Controller("aspirants/:aspirantId/chat")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AspirantChatController {
  constructor(private readonly chatService: AspirantChatService) {}

  @Post("messages")
  @ApiOperation({ summary: "Post a message to an aspirant's chat room" })
  @ApiParam({
    name: "aspirantId",
    type: "number",
    description: "Aspirant ID",
    example: 1,
  })
  @ApiResponse({ status: 201, description: "Message posted" })
  postMessage(
    @CurrentUser() user: any,
    @Param("aspirantId") aspirantId: string,
    @Body() dto: CreateAspirantMessageDto,
  ) {
    return this.chatService.createMessage(user.id, Number(aspirantId), dto);
  }

  @Get("messages")
  @ApiOperation({ summary: "Get messages for an aspirant's chat room" })
  @ApiParam({
    name: "aspirantId",
    type: "number",
    description: "Aspirant ID",
    example: 1,
  })
  @ApiResponse({ status: 200, description: "Messages returned" })
  getMessages(
    @Param("aspirantId") aspirantId: string,
    @Query() query: GetAspirantMessagesDto,
  ) {
    return this.chatService.getMessages(Number(aspirantId), query);
  }

  @Delete("messages/:messageId")
  @ApiOperation({ summary: "Delete your message in aspirant chat room" })
  @ApiParam({
    name: "aspirantId",
    type: "number",
    description: "Aspirant ID",
    example: 1,
  })
  @ApiParam({
    name: "messageId",
    type: "number",
    description: "Message ID",
    example: 10,
  })
  deleteMessage(
    @CurrentUser() user: any,
    @Param("messageId") messageId: string,
  ) {
    return this.chatService.deleteMessage(Number(messageId), user.id);
  }
}
