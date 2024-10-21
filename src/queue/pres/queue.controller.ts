import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { QueuePostResponseDto, QueueGetResponseDto } from './dto';
import { QueueUsecase } from '../app/queue.use-case';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('대기열 API') // 컨트롤러 태그 설정
@Controller('queues')
export class QueueController {
  constructor(
    private readonly QueueUsecase: QueueUsecase
  ) {}

  @Post('')
  @ApiOperation({ summary: '대기열 입장' })
  @ApiCreatedResponse({
    description: '성공',
    type: QueuePostResponseDto,
  })
  //@UseGuards(SessionGuard)
  async enter(
    @Req() req:Request
  ): Promise<QueuePostResponseDto> {

    const userId = req['userId'];
    const uuid = req.cookies['sessionId'].uuid;

    const enterResult = await this.QueueUsecase.enter(parseInt(userId), uuid);
    
    return enterResult;
  }

  @Get('/positions')
  @ApiOperation({ summary: '대기열 순위' })
  @ApiCreatedResponse({
    description: '성공',
    type: QueueGetResponseDto,
  })
  //@UseGuards(SessionGuard)
  async myPosition(
    @Req() req:Request
  ): Promise<QueueGetResponseDto> {

    const userId = req['userId'];

    const myPosition = await this.QueueUsecase.myPosition(parseInt(userId));

    return myPosition;
    
  }

}
