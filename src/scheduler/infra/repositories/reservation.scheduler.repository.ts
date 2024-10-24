import { Injectable } from '@nestjs/common';
import { EntityManager, In } from 'typeorm';
import { ReservationEntity } from '../../../reservation/infra/entities';
import { ReservationSchedulerEntity } from '../entities';
import { AbstractReservationSchedulerRepository } from '../../domain/repository.interfaces/reservation.scheduler.repository.interface';

@Injectable()
export class ReservationSchedulerRepository implements AbstractReservationSchedulerRepository{

  // 특정status의 item검색
  async items(reservationSchedulerEntity: ReservationSchedulerEntity, manager: EntityManager): Promise<ReservationEntity[]> {
    return manager.find(ReservationEntity, {
      where: { status: reservationSchedulerEntity.status },
    });
  }

  // 특정item의 status 변경
  async updateStatus(reservationSchedulerEntity: ReservationSchedulerEntity, manager: EntityManager): Promise<number> {
    const updateResult = await manager.update(ReservationEntity, { id: In(reservationSchedulerEntity.ids) }, { status: reservationSchedulerEntity.status });
    return updateResult.affected;
  }

}
