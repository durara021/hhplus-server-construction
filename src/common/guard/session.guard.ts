import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from '../../session/app/session.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly sessionService: SessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response: Response = context.switchToHttp().getResponse<Response>();

    let sessionId = request.cookies['sessionId'];

    if (!sessionId) {
      // 세션 ID가 없으면 새로 생성
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });

      const userId = Math.floor(Math.random() * 1000); // 임의의 userId 생성

      // 세션 생성 및 저장
      const createResult = await this.sessionService.create(uuid, userId);
      response.cookie('sessionId', uuid, { httpOnly: true, secure: true });
      request['sessionData'] = createResult;
    } else {
      // 기존 세션 ID가 있으면 해당 세션 데이터 조회
      const sessionData = await this.sessionService.session(sessionId);
      
      if (!sessionData) {
        // 세션 데이터가 없을 경우 새로운 세션 생성
        const userId = Math.floor(Math.random() * 1000);
        const createResult = await this.sessionService.create(sessionId, userId);
        request['sessionData'] = createResult;
      } else {
        // 세션 데이터를 request 객체에 추가
        request['sessionData'] = sessionData;
      }
    }

    return true;
  }
}
