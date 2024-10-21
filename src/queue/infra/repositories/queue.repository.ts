import { Injectable, NotFoundException } from "@nestjs/common";
import { QueueEntity } from "../../domain/entities/queue.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";
import { AbstractQueueRepository } from "../../../queue/domain/repository.interfaces";

@Injectable()
export class QueueRepository implements AbstractQueueRepository{
  
  private autoManagerRepository: AutoManagerRepository<QueueEntity>;

  constructor(
    @InjectRepository(QueueEntity)
    private readonly repository: Repository<QueueEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async myQueueInfo(queueEntity: QueueEntity): Promise<QueueEntity | null>{
    return await this.autoManagerRepository.proxyInstance.findOne({
      where: {userId: queueEntity.userId}
    });
  }

  async enter(queueEntity: QueueEntity): Promise<QueueEntity> {
    const result = await this.autoManagerRepository.proxyInstance.save(queueEntity);
    return result;
  }

  // 특정 사용자의 앞에 있는 대기열 사용자 수 계산
  async lastActiveUser(): Promise<QueueEntity | null> {
    return await this.autoManagerRepository.proxyInstance.findOne({
      where: { status: 'active' },
      order: { id: 'DESC' },
    });
  }

  async expire(queueEntity: QueueEntity): Promise<QueueEntity> {
    await this.autoManagerRepository.proxyInstance.update(
      { userId: queueEntity.userId },
      { status: queueEntity.status }
    );

    return this.autoManagerRepository.proxyInstance.findOne({where: { userId : queueEntity.userId }});
  }

}