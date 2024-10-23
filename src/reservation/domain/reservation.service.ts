import { Injectable } from '@nestjs/common';
import { ReservationRequestEntity as ReservationEntity } from '../infra/entities';
import { AbstractReservationRepository } from './repository.interfaces';
import { AbstractReservationService } from './service.interfaces/reservation.service.interface';
import { ReservationRequestModel } from './models';
import { ReservationResponseCommand } from '../app/commands';
import { ObjectMapper } from 'src/common/mapper/object-mapper';

@Injectable()
export class ReservationService implements AbstractReservationService{

  constructor(
    private readonly reservationRepository: AbstractReservationRepository,
    private readonly objectMapper: ObjectMapper,
  ) {}

  //임시 예약
  async reserve(model: ReservationRequestModel): Promise<ReservationResponseCommand> {

    //임시 예약
    return this.objectMapper.mapObject((await this.reservationRepository.reserve(this.objectMapper.mapObject(model, ReservationEntity))), ReservationResponseCommand);
  }
  
  //상태 변경
  async statusUpdate(model: ReservationRequestModel): Promise<ReservationResponseCommand> {
    return this.objectMapper.mapObject((await this.reservationRepository.statusUpdate(this.objectMapper.mapObject(model, ReservationEntity))), ReservationResponseCommand);
  }
  
  //상태(복수) 변경
  async statusesUpdate(model: ReservationRequestModel): Promise<void> {
    await this.reservationRepository.statusesUpdate(this.objectMapper.mapObject(model, ReservationEntity));
  }

  //예약된 아이템 조회
  async reservedItems(model: ReservationRequestModel): Promise<ReservationResponseCommand[]> {
    // 예약된 좌석 조회
    return this.objectMapper.mapArray((await this.reservationRepository.reservedItems(this.objectMapper.mapObject(model, ReservationEntity))), ReservationResponseCommand);
  }
  
  // 예약된 아이템 조회
  async isAvailableItem(model: ReservationRequestModel): Promise<ReservationResponseCommand> {

    // 예약된 좌석 조회
    const reservedItem = await this.reservationRepository.reservedItem(this.objectMapper.mapObject(model, ReservationEntity));

    if(reservedItem) throw new Error("이미 예약된 아이템입니다.");

    return this.objectMapper.mapObject(reservedItem, ReservationResponseCommand);
  }

  //임시예약 티켓 조회
  async itemsByStatus(model: ReservationRequestModel): Promise<ReservationResponseCommand[]> {
    return this.objectMapper.mapArray((await this.reservationRepository.itemsByStatus(this.objectMapper.mapObject(model, ReservationEntity))), ReservationResponseCommand);;
  }

}
