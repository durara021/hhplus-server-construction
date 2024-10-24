// app/scheduler/scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { QueueSchedulerEntity, ReservationSchedulerEntity } from '../infra/entities';
import { AbstractQueueSchedulerRepository, AbstractReservationSchedulerRepository } from './repository.interfaces'; 
import { EntityManager } from 'typeorm';

@Injectable()
export class SchedulerService {
  constructor(
    private readonly queueShcedulerRepository: AbstractQueueSchedulerRepository,
    private readonly reservationShcedulerRepository: AbstractReservationSchedulerRepository,
  ) {}

  async pendingUser(capacity: number, status: string, manager: EntityManager): Promise<number[]> {
    const queueEntity: QueueSchedulerEntity = new QueueSchedulerEntity();
    queueEntity.capacity = capacity;
    queueEntity.status = status;
    
    // capacity 만큼의 유저 추출
    const waitingUsers = await this.queueShcedulerRepository.pendingUsers(queueEntity, manager);
    const waitingIds = waitingUsers.map(user => user.id);
    return waitingIds;
  }

  async queueStatusesUpdate(ids: number[], status: string, manager: EntityManager): Promise<number> {
    const queueEntity: QueueSchedulerEntity = new QueueSchedulerEntity();
    queueEntity.ids  = ids;
    queueEntity.status = status;

    const updateReuslt = await this.queueShcedulerRepository.updateStatus(queueEntity, manager);

    return updateReuslt;
  }

  async tempItems(status: string, rule: number, manager: EntityManager): Promise<number[]> {
    const reservationEntity: ReservationSchedulerEntity = new ReservationSchedulerEntity();
    reservationEntity.status = status;

    const items = await this.reservationShcedulerRepository.items(reservationEntity, manager);

    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - rule * 60 * 1000);
    const expiredItems = items.filter(item => item.regDate < fiveMinutesAgo).map(item => item.id);

    return expiredItems;
  }

  async reservationStatusesUpdate(ids: number[], status: string, manager: EntityManager): Promise<number> {
    const queueEntity: QueueSchedulerEntity = new QueueSchedulerEntity();
    queueEntity.ids  = ids;
    queueEntity.status = status;

    const updateReuslt = await this.reservationShcedulerRepository.updateStatus(queueEntity, manager);

    return updateReuslt;
  }

}
