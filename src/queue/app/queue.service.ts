import { Injectable } from '@nestjs/common';
import { QueueEntity } from '../domain/entities';
import { AbstractQueueRepository } from '../domain/repository.interfaces';
import { AbstractQueueService } from '../domain/service.interfaces'

@Injectable()
export class QueueService implements AbstractQueueService{

  constructor(
    private readonly queueRepository: AbstractQueueRepository,
  ) {}

  //대기열 진입
  async enter(userId:number, uuid:string): Promise<{position:number, status: string}> {
    const queueEntity:QueueEntity = new QueueEntity();
    queueEntity.userId = this.isValidNum(userId, 'userId');
    queueEntity.uuid = this.isValidUuidv4(uuid);

    return this.queueRepository.enter(queueEntity);
  }

  //내 순번 및 상태 확인
  async myPosition(userId: number):Promise<{position:number, status: string}> {
    const queueEntity: QueueEntity = new QueueEntity();
    queueEntity.userId = this.isValidNum(userId, 'userId');

    return this.queueRepository.myPosition(queueEntity);
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
