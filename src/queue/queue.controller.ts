import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queues')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post()
  async enterQueue(@Body() createQueueDto: CreateQueueDto) {
    // Mocked response for queue entry
    return {
      statusCode: HttpStatus.OK,
      message: '대기열에 성공적으로 진입했습니다.',
      data: {
        userId: 'qlekjr2...',
        status: 'wait',
      },
    };
  }

}
