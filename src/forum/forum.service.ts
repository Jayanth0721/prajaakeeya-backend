import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMessagesDto } from './dto/get-messages.dto';

@Injectable()
export class ForumService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: Repository<Message>,
  ) {}

  async createMessage(userId: number, wardId: number, dto: CreateMessageDto) {
    const message = this.messageRepo.create({
      content: dto.content,
      userId,
      wardId,
    });
    return this.messageRepo.save(message);
  }

  async getWardMessages(wardId: number, query: GetMessagesDto) {
    const { page = 1, limit = 50 } = query;
    const skip = (page - 1) * limit;

    const [messages, total] = await this.messageRepo.findAndCount({
      where: { wardId },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data: messages,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async deleteMessage(messageId: number, userId: number) {
    const message = await this.messageRepo.findOne({ where: { id: messageId } });
    
    if (!message) {
      throw new NotFoundException('Message not found');
    }

    if (message.userId !== userId) {
      throw new ForbiddenException('You can only delete your own messages');
    }

    await this.messageRepo.remove(message);
    return { message: 'Message deleted successfully' };
  }
}
