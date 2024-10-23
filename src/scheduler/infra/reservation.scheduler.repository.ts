import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In, LessThan } from 'typeorm';
import { ReservationResponseEntity as ReservationEntity } from '../../reservation/infra/entities';
import { ReservationSchedulerEntity } from '../domain/entities';
import { AutoManagerRepository } from '../../common/utils/auto-manager.repository';
import { AbstractReservationSchedulerRepository } from '../domain/repository.interfaces/reservation.scheduler.repository.interface';

@Injectable()
export class ReservationSchedulerRepository implements AbstractReservationSchedulerRepository{
  private autoManagerRepository: AutoManagerRepository<ReservationEntity>;

  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: Repository<ReservationEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  // 특정status의 item검색
  async items(reservationSchedulerEntity: ReservationSchedulerEntity): Promise<ReservationEntity[]> {
    return this.autoManagerRepository.proxyInstance.find({
      where: { status: reservationSchedulerEntity.status },
    });
  }

  // 특정item의 status 변경
  async updateStatus(reservationSchedulerEntity: ReservationSchedulerEntity): Promise<number> {
    const updateResult = await this.autoManagerRepository.proxyInstance.update({ id: In(reservationSchedulerEntity.ids) }, { status: reservationSchedulerEntity.status });
    return updateResult.affected;
  }

}
