import { Injectable } from "@nestjs/common";
import { ReservationEntity } from "../entities/reservation.entity";

interface ReservationRepositoryInterface{
    reserve(reservationEntity: ReservationEntity): Promise<ReservationEntity>
    book(reservationEntity: ReservationEntity): Promise<ReservationEntity>
}

@Injectable()
export abstract class AbstractReservationRepository implements ReservationRepositoryInterface{
    abstract reserve(reservationEntity: ReservationEntity): Promise<ReservationEntity>
    abstract book(reservationEntity: ReservationEntity): Promise<ReservationEntity>;
}