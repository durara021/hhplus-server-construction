import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In, LessThan } from 'typeorm';
import { QueueEntity } from '../../queue/infra/repositories/entities';
import { QueueSchedulerEntity } from '../domain/entities';
import { AutoManagerRepository } from '../../common/utils/auto-manager.repository';
import { AbstractQueueSchedulerRepository } from '../domain/repository.interfaces';

@Injectable()
export class QueueSchedulerRepository implements AbstractQueueSchedulerRepository{
  private autoManagerRepository: AutoManagerRepository<QueueEntity>;

  constructor(
    @InjectRepository(QueueEntity)
    private readonly repository: Repository<QueueEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  // 'waiting' 상태의 사용자 중 오래된 순서대로 최대 100명 조회
  async pendingUsers(queueSchedulerEntity: QueueSchedulerEntity): Promise<QueueEntity[]> {
    return this.autoManagerRepository.proxyInstance.find({
      where: { status: queueSchedulerEntity.status },
      order: { createdAt: 'ASC' },
      take: queueSchedulerEntity.capacity,
    });
  }

  // 특정 사용자 ID 목록을 받아 'active' 상태로 업데이트
  async updateStatus(queueSchedulerEntity: QueueSchedulerEntity): Promise<number> {
    const updateResult = await this.autoManagerRepository.proxyInstance.update({ id: In(queueSchedulerEntity.ids) }, { status: queueSchedulerEntity.status });
    return updateResult.affected;
  }

}
