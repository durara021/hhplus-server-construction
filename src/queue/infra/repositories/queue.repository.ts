import { Injectable, NotFoundException } from "@nestjs/common";
import { QueueEntity } from "./entities/queue.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";
import { AbstractQueueRepository } from "../../../queue/domain/repository.interfaces";
import { ObjectMapper } from "src/common/mapper/object-mapper";
import { QueueResponseModel } from "src/queue/domain/models";

@Injectable()
export class QueueRepository implements AbstractQueueRepository{
  
  private autoManagerRepository: AutoManagerRepository<QueueEntity>;

  constructor(
    @InjectRepository(QueueEntity)
    private readonly repository: Repository<QueueEntity>,
    private readonly objectMapper: ObjectMapper,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async myQueueInfo(queueEntity: QueueEntity): Promise<QueueResponseModel | null>{
    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.findOne({
      where: {userId: queueEntity.userId}
    })), QueueResponseModel);
  }

  async enter(queueEntity: QueueEntity): Promise<QueueResponseModel> {
    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.save(queueEntity)), QueueResponseModel);
  }

  // 특정 사용자의 앞에 있는 대기열 사용자 수 계산
  async lastActiveUser(): Promise<QueueResponseModel | null> {
    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.findOne({
      where: { status: 'active' },
      order: { id: 'DESC' },
    })), QueueResponseModel);
  }

  async expire(queueEntity: QueueEntity): Promise<QueueResponseModel> {
    await this.autoManagerRepository.proxyInstance.update(
      { userId: queueEntity.userId },
      { status: queueEntity.status }
    );

    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.findOne({where: { userId : queueEntity.userId }})), QueueResponseModel);
  }

}