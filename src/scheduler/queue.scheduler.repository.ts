import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In, LessThan } from 'typeorm';
import { QueueEntity } from '../queue/domain/entities';
import { AutoManagerRepository } from '../common/utils/auto-manager.repository';

@Injectable()
export class QueueSchedulerRepository {
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
  async waitingUsers(limit: number): Promise<QueueEntity[]> {
    return this.autoManagerRepository.proxyInstance.find({
      where: { status: 'waiting' },
      order: { createdAt: 'ASC' },
      take: limit,
    });
  }

  // 특정 사용자 ID 목록을 받아 'active' 상태로 업데이트
  async updateUsersToActive(userIds: number[]): Promise<void> {
    await this.autoManagerRepository.proxyInstance.update({ id: In(userIds) }, { status: 'active' });
  }

}
