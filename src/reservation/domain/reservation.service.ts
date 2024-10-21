import { Injectable } from '@nestjs/common';
import { ReservationEntity } from './entities';
import { AbstractReservationRepository } from './repository.interfaces';
import { AbstractReservationService } from './service.interfaces/reservation.service.interface';

@Injectable()
export class ReservationService implements AbstractReservationService{

  constructor(
    private readonly reservationRepository: AbstractReservationRepository,
  ) {}

  //임시 예약
  async reserve(mainCateg: number, subCateg:number, minorCateg: number, userId:number): Promise<ReservationEntity> {

    const reservationEntity = new ReservationEntity();
    reservationEntity.mainCateg = mainCateg;
    reservationEntity.subCateg = subCateg;
    reservationEntity.minorCateg = minorCateg;
    reservationEntity.userId = userId;

    //임시 예약
    const reserveResult = await this.reservationRepository.reserve(reservationEntity);
    
    return reserveResult;
  }
  
  //상태 변경
  async statusUpdate(reservationId:number, status:string): Promise<ReservationEntity> {

    const reservationEntity = new ReservationEntity();
    reservationEntity.id = reservationId;
    reservationEntity.status = status;

    //임시 예약
    const reserveResult = await this.reservationRepository.statusUpdate(reservationEntity);
    
    return reserveResult;
  }
  
  //상태(복수) 변경
  async statusesUpdate(reservationEntities: ReservationEntity[]): Promise<ReservationEntity> {

    //임시 예약
    const reserveResult = await this.reservationRepository.statusesUpdate(reservationEntities);
    
    return reserveResult;
  }

  //예약가능한 아이템 조회
  async availableItems(mainCateg: number, subCateg:number, capacity: number): Promise<number[]> {
    const reservationEntity = new ReservationEntity();
    reservationEntity.mainCateg = mainCateg;
    reservationEntity.subCateg = subCateg;

    // 예약된 좌석 조회
    const reservedItems = await this.reservationRepository.reservedItems(reservationEntity);

    // 예약된 좌석 번호 추출
    const reservedItemNums: Set<number> = new Set(reservedItems.map(item => item.minorCateg));

    const allItems = Array.from({ length: capacity }, (_, i) => i + 1);

    const availableItems = allItems.filter(item => !reservedItemNums.has(item));

    return availableItems;
  }
  
  // 예약된 아이템 조회
  async isAvailableItem(mainCateg: number, subCateg:number, minorCateg: number): Promise<ReservationEntity> {
    const reservationEntity = new ReservationEntity();
    reservationEntity.mainCateg = mainCateg;
    reservationEntity.subCateg = subCateg;
    reservationEntity.minorCateg = minorCateg;

    // 예약된 좌석 조회
    const reservedItem = await this.reservationRepository.reservedItem(reservationEntity);

    if(reservedItem) throw new Error("이미 예약된 아이템입니다.");

    return reservedItem;
  }

  //임시예약 티켓 조회
  async itemsByStatus(status: string): Promise<ReservationEntity[]> {
    const reservationEntity = new ReservationEntity();
    reservationEntity.status = status;

    return this.reservationRepository.itemsByStatus(reservationEntity);
  }
}
