import { EntityManager, In, Not, Repository } from "typeorm";
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

  async reservedItems(reservatioEntity: ReservationEntity): Promise<ReservationEntity[]> {
    return await this.autoManagerRepository.proxyInstance.find(
      { where: {
          mainCateg: reservatioEntity.mainCateg,
          subCateg: reservatioEntity.subCateg,
          minorCateg: In([ 'temp', 'confirmed' ]),
        }
      } 
    );
  }

  async statusUpdate(reservationEntity: ReservationEntity): Promise<ReservationEntity> {
    await this.autoManagerRepository.proxyInstance.update(
      { id: reservationEntity.id }, 
      { status: reservationEntity.status }
    )

    return await this.autoManagerRepository.proxyInstance.findOne({where: {userId: reservationEntity.id}});
  }
  
  async statusesUpdate(reservationId: number[], status: string): Promise<number> {
    const result = await this.autoManagerRepository.proxyInstance.update(
      { id: In(reservationId) }, 
      { status: status }
    )

    return result.affected;
  }
  async reservedItem(reservationEntity: ReservationEntity): Promise<ReservationEntity> {
    return await this.autoManagerRepository.proxyInstance.findOne(
      { where : {
          mainCateg: reservationEntity.mainCateg,
          subCateg: reservationEntity.subCateg,
          minorCateg: reservationEntity.minorCateg,
          status: Not('temp')
        }
      }
    );
  }

  async itemsByStatus(reservationEntity: ReservationEntity): Promise<ReservationEntity[]> {
    return await this.autoManagerRepository.proxyInstance.find(
      { where : {
          status: Not(reservationEntity.status)
        }
      }
    );
  }
}
