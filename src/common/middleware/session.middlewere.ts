import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { AbstractSessionService } from '../../session/domain/service.interfaces/session.service.interface';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    private readonly sessionService: AbstractSessionService,
    private readonly dataSource: DataSource,
  ) {}

  async use(req: Request, next: NextFunction) {
    return await this.dataSource.transaction(async (manager: EntityManager) => {
      const sessionId = req.cookies['sessionId'] || req.headers['sessionId'];

      if (!sessionId) {
        throw new UnauthorizedException('세션이 없습니다.');
      }

      const session = await this.sessionService.session(sessionId, manager);

      if (!session || this.isSessionExpired(session.regDate)) {
        throw new UnauthorizedException('세션이 만료되었습니다.');
      }

      // 세션이 유효하면 userId를 요청 객체에 추가
      req.body['userId'] = session.userId;
      req.body['status'] = session.status;
      
      next(); // 다음 가드나 핸들러로 넘어감
    });
  }

  private isSessionExpired(regDate: Date): boolean {
    const sessionDuration = 1000 * 60 * 60; // 1시간
    return (Date.now() - regDate.getTime()) > sessionDuration;
  }
}
