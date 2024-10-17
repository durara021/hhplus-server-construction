import { Injectable } from '@nestjs/common';
import { ReservationEntity } from '../domain/entities';
import { AbstractReservationRepository } from '../domain/repository.interfaces';
import { AbstractReservationService } from '../domain/service.interfaces/reservation.service.interface';

@Injectable()
export class ReservationService implements AbstractReservationService{

  constructor(
    private readonly reservationRepository: AbstractReservationRepository,
  ) {}

  //임시 예약
  async reserve(category: string, categoryId:number, itemId: number, userId:number): Promise<ReservationEntity> {

    const reservationEntity = new ReservationEntity();
    reservationEntity.category = category;
    reservationEntity.categoryId = this.isValidNum(categoryId, 'categoryId');
    reservationEntity.itemId = this.isValidNum(itemId, 'itemId');
    reservationEntity.userId = this.isValidNum(userId, 'userId');

    //임시 예약
    const reserveResult = await this.reservationRepository.reserve(reservationEntity);
    
    return reserveResult;
  }
  
  //예약 확정
  async book(reservationId:number, status:string): Promise<ReservationEntity> {

    const reservationEntity = new ReservationEntity();
    reservationEntity.id = this.isValidNum(reservationId, 'reservationId');
    reservationEntity.status = status;

    //임시 예약
    const reserveResult = await this.reservationRepository.reserve(reservationEntity);
    
    return reserveResult;
  }

  // 사용 가능한 숫자인지 확인(양의 정수)
	private isValidNum(num: any, gubun: string): number {
		if(Number.isInteger(num) && num > 0) return num;
		throw new Error(`${num}는 입력할 수 없는 ${gubun}형식입니다.`);
	}
  
}
