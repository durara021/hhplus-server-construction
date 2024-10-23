import { EntityManager, In, Not, Repository } from "typeorm";
import { ReservationRequestEntity, ReservationResponseEntity as ReservationEntity } from "../entities";
import { Injectable } from "@nestjs/common";
import { AbstractReservationRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";
import { ReservationResponseCommand } from "../../app/commands"
import { ObjectMapper } from "src/common/mapper/object-mapper";

@Injectable()
export class ReservationRepository implements AbstractReservationRepository {
  
  private autoManagerRepository: AutoManagerRepository<ReservationEntity>;

  constructor(
    @InjectRepository(ReservationEntity)
    private readonly repository: Repository<ReservationEntity>,
    private readonly objectMapper: ObjectMapper,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async reserve(reservationEntity:ReservationRequestEntity): Promise<ReservationResponseCommand> {
    return this.objectMapper.mapObject(await this.autoManagerRepository.proxyInstance.save(reservationEntity), ReservationResponseCommand);
  }

  async reservedItems(reservatioEntity: ReservationRequestEntity): Promise<ReservationResponseCommand[]> {
    return this.objectMapper.mapArray(await this.autoManagerRepository.proxyInstance.find(
      { where: {
          mainCateg: reservatioEntity.mainCateg,
          subCateg: reservatioEntity.subCateg,
          minorCateg: In([ 'temp', 'confirmed' ]),
        }
      } 
    ), ReservationResponseCommand);
  }

  async statusUpdate(reservationEntity: ReservationRequestEntity): Promise<ReservationResponseCommand> {
    await this.autoManagerRepository.proxyInstance.update(
      { id: reservationEntity.id }, 
      { status: reservationEntity.status }
    )

    return this.objectMapper.mapObject(await this.autoManagerRepository.proxyInstance.findOne({where: {userId: reservationEntity.id}}), ReservationResponseCommand);
  }
  
  async statusesUpdate(reservationEntity: ReservationRequestEntity): Promise<void> {
    const result = await this.autoManagerRepository.proxyInstance.update(
      { id: In(reservationEntity.ids) }, 
      { status: reservationEntity.status }
    )
  }
  async reservedItem(reservationEntity: ReservationRequestEntity): Promise<ReservationResponseCommand> {
    return this.objectMapper.mapObject(await this.autoManagerRepository.proxyInstance.findOne(
      { where : {
          mainCateg: reservationEntity.mainCateg,
          subCateg: reservationEntity.subCateg,
          minorCateg: reservationEntity.minorCateg,
          status: Not('temp')
        }
      }
    ), ReservationResponseCommand);
  }

  async itemsByStatus(reservationEntity: ReservationRequestEntity): Promise<ReservationResponseCommand[]> {
    return this.objectMapper.mapArray(
      await this.autoManagerRepository.proxyInstance.find(
        { where : {
            status: Not(reservationEntity.status)
          }
        }
      )
    , ReservationResponseCommand);
  }
}
