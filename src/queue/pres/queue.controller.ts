import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { QueuePostResponseDto, QueueGetResponseDto } from './dto';
import { QueueUsecase } from '../app/queue.use-case';
//import { SessionGuard } from '../../common/guard/session.guard';
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

    const sessionData = req['sessionData'];
    if (!sessionData || !sessionData.userId || !sessionData.uuid) {
      throw new Error('Invalid session data');
    }

    const userId: string = sessionData.userId;
    const uuid: string = sessionData.uuid;
    
    const enterResult = await this.QueueUsecase.enter(parseInt(userId), uuid);
    sessionData.myPosition = enterResult.position;
    sessionData.status = enterResult.status;
    
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

    const sessionData = req['sessionData'];
    if (!sessionData || !sessionData.userId || !sessionData.uuid) {
      throw new Error('Invalid session data');
    }

    const userId: string = sessionData.userId;

    const myPosition = await this.QueueUsecase.myPosition(parseInt(userId));

    sessionData.myPosition = myPosition.position;
    sessionData.status = myPosition.status;

    return myPosition;
    
  }

}
