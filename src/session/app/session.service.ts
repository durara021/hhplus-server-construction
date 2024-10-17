import { Injectable } from '@nestjs/common';
import { SessionEntity } from '../domain/entitiy.interfaces';
import { AbstractSessionRepository } from '../domain/repository.interfaces';

@Injectable()
export class SessionService {

  constructor(
    private readonly sessionRepository: AbstractSessionRepository,
  ) {}

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  //세션 생성
  async create(uuid:string, userId: number): Promise<SessionEntity> {
    const sessionEntity:SessionEntity = new SessionEntity();
    sessionEntity.uuid = this.isValidUuidv4(uuid);
    sessionEntity.userId = this.isValidNum(userId, 'userId');
    
    return this.sessionRepository.create(sessionEntity);
  }

  async session(userId: number): Promise<SessionEntity>{
    const sessionEntity: SessionEntity = new SessionEntity();
    sessionEntity.userId = this.isValidNum(userId, 'userId');
    return this.sessionRepository.session(sessionEntity);
  }

    // 사용 가능한 숫자인지 확인(양의 정수)
	private isValidNum(num: any, gubun: string): number {
		if(Number.isInteger(num) && num > 0) return num;
		throw new Error(`${num}는 입력할 수 없는 ${gubun}형식입니다.`);
	}

    // uuidv4형식이 맞는지 확인
    private isValidUuidv4(uuid: string): string {
      const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if(uuidV4Regex.test(uuid)) return uuid;
      throw new Error('uuidv4형식에 맞지 않는 string입니다.');
    }

}
