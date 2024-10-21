import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AbstractSessionService } from '../../session/domain/service.interfaces/session.service.interface';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly sessionService: AbstractSessionService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    
    const req = context.switchToHttp().getRequest<Request>();
      
    if (req.method === 'POST') {
      // 쿠키에서 세션 ID를 추출 (또는 헤더에서 추출 가능)
      const sessionId = req.cookies['sessionId'] || req.headers['sessionId'];
      
      // 세션 ID가 있는지 확인
      if (sessionId) {
        const session = await this.sessionService.session(sessionId.uuid);
        

        const sessionDuration = 1000 * 60 * 60;
        const currentTime = Date.now();
        if(session.regDate - currentTime > sessionDuration) {
          this.sessionService.expire(session.uuid);
          throw new UnauthorizedException('세션이 만료되었습니다.');
        } else {
          req['userId'] = session.userId; // userId를 요청 객체에 추가
        }
      } else {
        throw new UnauthorizedException('세션이 없습니다.00');
      }
    }
    return true;
  }
}
