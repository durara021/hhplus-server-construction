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

  async enter(queueEntity: QueueEntity): Promise<{position:number, status: string}> {
    const result = await this.autoManagerRepository.proxyInstance.save(queueEntity);
    return this.myPosition(result);
  }

  // 특정 사용자의 앞에 있는 대기열 사용자 수 계산
  async myPosition(queueEntity: QueueEntity): Promise<{position:number, status: string}> {
    const user = await this.autoManagerRepository.proxyInstance.findOne({ where: { userId: queueEntity.userId } });
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    const myPosition = await this.autoManagerRepository.proxyInstance.createQueryBuilder('queue')
      .where('queue.id < :id', { id: user.id })
      .andWhere('queue.status = :status', { status: user.status })
      .getCount();

    return {position: myPosition + 1, status: user.status};
  }

}