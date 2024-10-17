import { Body, Controller, Param, Post } from '@nestjs/common';
import { SessionUsecase } from '../app/session.use-case'; 
import { SessionPostResponseDto as ResPostDto} from './dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { response } from 'express';

@ApiTags('세션 API') // 컨트롤러 태그 설정
@Controller('sessions')
export class SessionController {
  
  constructor(
    private readonly sessionUsecase: SessionUsecase
  ) {}

  @Post('')
  @ApiOperation({ summary: '세션생성' })
  @ApiCreatedResponse({
    description: '성공',
    type: ResPostDto,
  })
  async reserve(
    @Body('userId') userId: string,
  ): Promise<ResPostDto> {
    
    const createResult = await this.sessionUsecase.create(parseInt(userId));
    response.cookie('sessionId', createResult.uuid, { httpOnly: true, secure: true });

    return new ResPostDto(createResult.uuid, createResult.userId, createResult.regDate);
  }

}
