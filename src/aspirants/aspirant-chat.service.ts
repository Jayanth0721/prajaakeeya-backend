import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AspirantMessage } from './aspirant-message.entity';
import { CreateAspirantMessageDto } from './dto/create-aspirant-message.dto';
import { GetAspirantMessagesDto } from './dto/get-aspirant-messages.dto';

@Injectable()
export class AspirantChatService {
  constructor(
    @InjectRepository(AspirantMessage)
    private readonly repo: Repository<AspirantMessage>,
  ) {}

  async createMessage(userId: number, aspirantId: number, dto: CreateAspirantMessageDto) {
    const message = this.repo.create({ content: dto.content, userId, aspirantId });
    return this.repo.save(message);
  }

  async getMessages(aspirantId: number, query: GetAspirantMessagesDto) {
    const { page = 1, limit = 50 } = query;
    const skip = (page - 1) * limit;

    const [messages, total] = await this.repo.findAndCount({
      where: { aspirantId },
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
    const message = await this.repo.findOne({ where: { id: messageId } });
    if (!message) throw new NotFoundException('Message not found');
    if (message.userId !== userId) throw new ForbiddenException('Can only delete your own messages');
    await this.repo.remove(message);
    return { message: 'Message deleted' };
  }
}
