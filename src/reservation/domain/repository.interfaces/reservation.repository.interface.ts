import { Injectable } from "@nestjs/common";
import { ReservationEntity } from "../entities/reservation.entity";

interface ReservationRepositoryInterface{
    reserve(reservationEntity: ReservationEntity): Promise<ReservationEntity>
    reservedItems(reservatioEntity: ReservationEntity): Promise<ReservationEntity[]>
    reservedItem(reservatioEntity: ReservationEntity): Promise<ReservationEntity>
    statusUpdate(reservationEntity: ReservationEntity): Promise<ReservationEntity>
    statusesUpdate(reservationId: number[], status: string): Promise<number>
    itemsByStatus(reservationEntity: ReservationEntity): Promise<ReservationEntity[]>
}

@Injectable()
export abstract class AbstractReservationRepository implements ReservationRepositoryInterface{
    abstract reserve(reservationEntity: ReservationEntity): Promise<ReservationEntity>
    abstract reservedItems(reservatioEntity: ReservationEntity): Promise<ReservationEntity[]>
    abstract reservedItem(reservatioEntity: ReservationEntity): Promise<ReservationEntity>
    abstract statusUpdate(reservationEntity: ReservationEntity): Promise<ReservationEntity>
    abstract statusesUpdate(reservationId: number[], status: string): Promise<number>
    abstract itemsByStatus(reservationEntity: ReservationEntity): Promise<ReservationEntity[]>
}