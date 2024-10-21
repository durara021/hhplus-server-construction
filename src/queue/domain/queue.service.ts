import { Injectable } from '@nestjs/common';
import { QueueEntity } from './entities';
import { AbstractQueueRepository } from './repository.interfaces';
import { AbstractQueueService } from './service.interfaces'

@Injectable()
export class QueueService implements AbstractQueueService{

  constructor(
    private readonly queueRepository: AbstractQueueRepository,
  ) {}

  // 내 대기열 정보
  async myQueueInfo(userId: number): Promise<QueueEntity> {
    const queueEntity: QueueEntity = new QueueEntity();
    queueEntity.userId = userId;
    
    return await this.queueRepository.myQueueInfo(queueEntity);
  }

  //대기열 진입
  async enter(userId:number, uuid:string): Promise<QueueEntity> {
    const queueEntity:QueueEntity = new QueueEntity();
    queueEntity.userId = userId;
    queueEntity.uuid = uuid;

    return await this.queueRepository.enter(queueEntity);
  }

  //액티브 상태의 마지막 유저 정보
  async myPosition(queueId: number):Promise<number> {
    return (await this.queueRepository.lastActiveUser()).id - queueId;
  }

  //대기열 만료
  async expire(userId: number): Promise<QueueEntity> {
    const queueEntity: QueueEntity = new QueueEntity();
    queueEntity.userId = userId;

    return await this.queueRepository.expire(queueEntity);
  }
  
}
