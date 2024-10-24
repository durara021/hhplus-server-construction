import { Injectable } from "@nestjs/common";
import { EntityManager, In, Not } from "typeorm";
import { ReservationRequestEntity, ReservationEntity } from "../entities";
import { AbstractReservationRepository } from "../../domain/repository.interfaces";
import { ReservationResponseCommand } from "../../app/commands"
import { ObjectMapper } from "../../../common/mapper/object-mapper";

@Injectable()
export class ReservationRepository implements AbstractReservationRepository {
  
  constructor(
    private readonly objectMapper: ObjectMapper,
  ) {}

  async reserve(reservationEntity:ReservationEntity, manager: EntityManager): Promise<ReservationResponseCommand> {
    return this.objectMapper.mapObject(await manager.save(reservationEntity), ReservationResponseCommand);
  }

  async reservedItems(reservatioEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand[]> {
    return this.objectMapper.mapArray(await manager.find(ReservationEntity, 
      { where: {
          mainCateg: reservatioEntity.mainCateg,
          subCateg: reservatioEntity.subCateg,
          minorCateg: In([ 'temp', 'confirmed' ]),
        }
      } 
    ), ReservationResponseCommand);
  }

  async statusUpdate(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand> {
    await manager.update(ReservationEntity,
      { id: reservationEntity.id }, 
      { status: reservationEntity.status }
    )

    return this.objectMapper.mapObject(await manager.findOne(ReservationEntity,{where: {id: reservationEntity.id}}), ReservationResponseCommand);
  }
  
  async statusesUpdate(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<void> {
    const result = await manager.update(ReservationEntity,
      { id: In(reservationEntity.ids) }, 
      { status: reservationEntity.status }
    )
  }
  async reservedItem(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand> {
    return this.objectMapper.mapObject(await manager.findOne(ReservationEntity,
      { where : {
          mainCateg: reservationEntity.mainCateg,
          subCateg: reservationEntity.subCateg,
          minorCateg: reservationEntity.minorCateg,
          status: Not('expired')
        }
      }
    ), ReservationResponseCommand);
  }

  async itemsByStatus(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand[]> {
    return this.objectMapper.mapArray(
      await manager.find(ReservationEntity,
        { where : {
            status: Not(reservationEntity.status)
          }
        }
      )
    , ReservationResponseCommand);
  }
}
