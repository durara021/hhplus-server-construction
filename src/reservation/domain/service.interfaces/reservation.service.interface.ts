import { Injectable } from '@nestjs/common';
import { ReservationEntity } from '../entities';

interface ReservationServiceInterface {
  reserve(category: string, categoryId:number, itemId: number, userId:number): Promise<ReservationEntity>
  book(reservationId: number, status:string): Promise<ReservationEntity>
}

@Injectable()
export abstract class AbstractReservationService implements ReservationServiceInterface {
  abstract reserve(category: string, categoryId:number, itemId: number, userId:number): Promise<ReservationEntity> 
  abstract book(reservationId: number, status:string): Promise<ReservationEntity> 
}
