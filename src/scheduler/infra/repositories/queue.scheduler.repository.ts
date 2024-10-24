import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { QueueEntity } from '../../../queue/infra/entities';
import { QueueSchedulerEntity } from '../entities';
import { AbstractQueueSchedulerRepository } from '../../domain/repository.interfaces';

@Injectable()
export class QueueSchedulerRepository implements AbstractQueueSchedulerRepository{

  // 'waiting' 상태의 사용자 중 오래된 순서대로 최대 100명 조회
  async pendingUsers(queueSchedulerEntity: QueueSchedulerEntity, manager: EntityManager): Promise<QueueEntity[]> {
    return manager.find(QueueEntity, {
      where: { status: queueSchedulerEntity.status },
      order: { createdAt: 'ASC' },
      take: queueSchedulerEntity.capacity,
    });
  }

  // 특정 사용자 ID 목록을 받아 'active' 상태로 업데이트
  async updateStatus(queueSchedulerEntity: QueueSchedulerEntity, manager: EntityManager): Promise<number> {
    const updateResult = await manager.update(QueueEntity, { id: In(queueSchedulerEntity.ids) }, { status: queueSchedulerEntity.status });
    return updateResult.affected;
  }

}
