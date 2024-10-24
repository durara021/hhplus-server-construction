import { ConflictException, Injectable } from '@nestjs/common';
import { SessionEntity } from '../infra/entities';
import { AbstractSessionRepository } from './repository.interfaces';
import { AbstractSessionService } from './service.interfaces/session.service.interface';
import { EntityManager } from 'typeorm';

@Injectable()
export class SessionService implements AbstractSessionService{

  constructor(
    private readonly sessionRepository: AbstractSessionRepository,
  ) {}

  private uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  //세션 생성
  async create(userId: number, manager: EntityManager): Promise<SessionEntity> {
    const sessionEntity:SessionEntity = new SessionEntity();
    sessionEntity.uuid = this.uuidv4();
    sessionEntity.userId = userId;
    
    const session = this.sessionRepository.create(sessionEntity, manager);
    if(!session) throw new ConflictException('UUID가 중복되어 세션을 생성할 수 없습니다.');
    return session;
  }

  async session(uuid: string, manager: EntityManager): Promise<SessionEntity> {
    const sessionEntity: SessionEntity = new SessionEntity();
    sessionEntity.uuid = uuid;
    sessionEntity.status = 'expired';

    return this.sessionRepository.session(sessionEntity, manager);
  }

  async expire(uuid: string, manager: EntityManager): Promise<SessionEntity> {
    const sessionEntity: SessionEntity = new SessionEntity();
    sessionEntity.uuid = uuid;
    sessionEntity.status = 'expired';

    return this.sessionRepository.expire(sessionEntity, manager);
  }
}
