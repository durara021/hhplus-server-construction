import { Injectable } from '@nestjs/common';
import { ReservationRequestEntity, ReservationEntity } from '../infra/entities';
import { AbstractReservationRepository } from './repository.interfaces';
import { AbstractReservationService } from './service.interfaces/reservation.service.interface';
import { ReservationRequestModel } from './models';
import { ReservationResponseCommand } from '../app/commands';
import { ObjectMapper } from '../../common/mapper/object-mapper';
import { EntityManager } from 'typeorm';

@Injectable()
export class ReservationService implements AbstractReservationService{

  constructor(
    private readonly reservationRepository: AbstractReservationRepository,
    private readonly objectMapper: ObjectMapper,
  ) {}

  //임시 예약
  async reserve(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand> {

    //임시 예약
    console.log("--------------------"+model.mainCateg);
    console.log("--------------------"+model.subCateg);
    console.log("--------------------"+model.minorCateg);
    return this.objectMapper.mapObject((await this.reservationRepository.reserve(this.objectMapper.mapObject(model, ReservationEntity), manager)), ReservationResponseCommand);
  }
  
  //상태 변경
  async statusUpdate(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand> {
    return this.objectMapper.mapObject((await this.reservationRepository.statusUpdate(this.objectMapper.mapObject(model, ReservationRequestEntity), manager)), ReservationResponseCommand);
  }
  
  //상태(복수) 변경
  async statusesUpdate(model: ReservationRequestModel, manager: EntityManager): Promise<void> {
    await this.reservationRepository.statusesUpdate(this.objectMapper.mapObject(model, ReservationRequestEntity), manager);
  }

  //예약된 아이템 조회
  async reservedItems(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand[]> {
    // 예약된 좌석 조회
    return this.objectMapper.mapArray((await this.reservationRepository.reservedItems(this.objectMapper.mapObject(model, ReservationRequestEntity), manager)), ReservationResponseCommand);
  }
  
  // 예약된 아이템 조회
  async isAvailableItem(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand> {

    // 예약된 좌석 조회
    const reservedItem = await this.reservationRepository.reservedItem(this.objectMapper.mapObject(model, ReservationRequestEntity), manager);
    if(!reservedItem) throw new Error("이미 예약된 아이템입니다.");

    return this.objectMapper.mapObject(reservedItem, ReservationResponseCommand);
  }

  //임시예약 티켓 조회
  async itemsByStatus(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand[]> {
    return this.objectMapper.mapArray((await this.reservationRepository.itemsByStatus(this.objectMapper.mapObject(model, ReservationRequestEntity), manager)), ReservationResponseCommand);;
  }

}
