import { EntityManager, Repository } from "typeorm";
import { ReservationEntity } from "../../domain/entities/reservation.entity";
import { Injectable } from "@nestjs/common";
import { AbstractReservationRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class ReservationRepository implements AbstractReservationRepository {
  
  private autoManagerRepository: AutoManagerRepository<ReservationEntity>;

  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: Repository<ReservationEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async reserve(reservationEntity:ReservationEntity): Promise<ReservationEntity> {
    return await this.autoManagerRepository.proxyInstance.save(reservationEntity);
  }

  async book(reservationEntity:ReservationEntity): Promise<ReservationEntity> {
    await this.autoManagerRepository.proxyInstance.createQueryBuilder()
      .update('ReservationEntity') 
      .set({ balance: reservationEntity.status }) 
      .where('userId = :userId', { userId: reservationEntity.id })
      .execute();

    return await this.autoManagerRepository.proxyInstance.findOne({where: {userId: reservationEntity.id}});
  }
  
}
