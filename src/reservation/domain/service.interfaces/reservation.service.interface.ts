import { Injectable } from '@nestjs/common';
import { ReservationEntity } from '../entities';

interface ReservationServiceInterface {
  reserve(mainCateg: number, subCateg:number, minorCateg: number, userId:number): Promise<ReservationEntity>
  statusUpdate(reservationId:number, status:string): Promise<ReservationEntity>
  statusesUpdate(reservationEntities: ReservationEntity[]): Promise<number>
  availableItems(mainCateg: number, subCateg:number, capacity: number): Promise<number[]>
  isAvailableItem(mainCateg: number, subCateg:number, minorCateg: number): Promise<ReservationEntity>
  itemsByStatus(status: string): Promise<ReservationEntity[]>
}

@Injectable()
export abstract class AbstractReservationService implements ReservationServiceInterface {
  abstract reserve(mainCateg: number, subCateg:number, minorCateg: number, userId:number): Promise<ReservationEntity>
  abstract statusUpdate(reservationId:number, status:string): Promise<ReservationEntity>
  abstract statusesUpdate(reservationEntities: ReservationEntity[]): Promise<number>
  abstract availableItems(mainCateg: number, subCateg:number, capacity: number): Promise<number[]>
  abstract isAvailableItem(mainCateg: number, subCateg:number, minorCateg: number): Promise<ReservationEntity>
  abstract itemsByStatus(status: string): Promise<ReservationEntity[]>
}
