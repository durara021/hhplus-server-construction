import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SessionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    // 미들웨어에서 userId가 추가되었는지 확인
    if (!req.body['userId']) {
      throw new UnauthorizedException('세션이 유효하지 않습니다.');
    }
    
    return true; // 통과되면 true 반환
  }
}
