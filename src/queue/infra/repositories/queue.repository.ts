import { Injectable } from "@nestjs/common";
import { QueueEntity } from "../entities/queue.entity";
import { EntityManager } from "typeorm";
import { AbstractQueueRepository } from "../../../queue/domain/repository.interfaces";
import { ObjectMapper } from "../../../common/mapper/object-mapper";
import { QueueResponseModel } from "../../../queue/domain/models";

@Injectable()
export class QueueRepository implements AbstractQueueRepository{

  constructor(
    private readonly objectMapper: ObjectMapper,
  ) {}

  async myQueueInfo(queueEntity: QueueEntity, manager: EntityManager): Promise<QueueResponseModel | null>{
    return this.objectMapper.mapObject((await manager.findOne(QueueEntity, {
      where: {userId: queueEntity.userId}
    })), QueueResponseModel);
  }

  async enter(queueEntity: QueueEntity, manager: EntityManager): Promise<QueueResponseModel> {
    return this.objectMapper.mapObject((await manager.save(queueEntity)), QueueResponseModel);
  }

  // 특정 사용자의 앞에 있는 대기열 사용자 수 계산
  async lastActiveUser(manager: EntityManager): Promise<QueueResponseModel | null> {
    return this.objectMapper.mapObject((await manager.findOne(QueueEntity, {
      where: { status: 'active' },
      order: { id: 'DESC' },
    })), QueueResponseModel);
  }

  async expire(queueEntity: QueueEntity, manager: EntityManager): Promise<QueueResponseModel> {
    await manager.update(QueueEntity, 
      { userId: queueEntity.userId },
      { status: queueEntity.status }
    );

    return this.objectMapper.mapObject((await manager.findOne(QueueEntity, {where: { userId : queueEntity.userId }})), QueueResponseModel);
  }

}