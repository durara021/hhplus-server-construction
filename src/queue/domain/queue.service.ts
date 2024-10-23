import { Injectable } from '@nestjs/common';
import { QueueRequestModel } from './models';
import { QueueResponseCommand } from '../app/commands';
import { QueueEntity } from '../infra/repositories/entities';
import { AbstractQueueRepository } from './repository.interfaces';
import { AbstractQueueService } from './service.interfaces'
import { ObjectMapper } from 'src/common/mapper/object-mapper';

@Injectable()
export class QueueService implements AbstractQueueService{

  constructor(
    private readonly queueRepository: AbstractQueueRepository,
    private readonly objectMapper: ObjectMapper,
  ) {}

  // 내 대기열 정보
  async myQueueInfo(model: QueueRequestModel): Promise<QueueResponseCommand> {
    return this.objectMapper.mapObject((await this.queueRepository.myQueueInfo(this.objectMapper.mapObject(model, QueueEntity))), QueueResponseCommand);
  }

  //대기열 진입
  async enter(model: QueueRequestModel): Promise<QueueResponseCommand> {
    return this.objectMapper.mapObject((await this.queueRepository.enter(this.objectMapper.mapObject(model, QueueEntity))), QueueResponseCommand);
  }

  //내 대기열 순서
  async myPosition(model: QueueRequestModel):Promise<QueueResponseCommand> {
    const myPosition = (await this.queueRepository.lastActiveUser()).id - model.id;
    model.updateMyPosition(myPosition);

    return this.objectMapper.mapObject(model, QueueResponseCommand);
  }
  //대기열 만료
  async expire(model: QueueRequestModel): Promise<QueueResponseCommand> {
    return this.objectMapper.mapObject((await this.queueRepository.expire(this.objectMapper.mapObject(model, QueueEntity))), QueueResponseCommand);
  }
  
}
