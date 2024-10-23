import { Injectable } from "@nestjs/common";
import { ReservationRequestEntity as ReservationEntity } from "../../infra/entities";
import { ReservationResponseCommand } from "../../app/commands";
interface ReservationRepositoryInterface{
    reserve(reservationEntity: ReservationEntity): Promise<ReservationResponseCommand>
    reservedItems(reservatioEntity: ReservationEntity): Promise<ReservationResponseCommand[]>
    reservedItem(reservatioEntity: ReservationEntity): Promise<ReservationResponseCommand>
    statusUpdate(reservationEntity: ReservationEntity): Promise<ReservationResponseCommand>
    statusesUpdate(reservationEntity: ReservationEntity): Promise<void>
    itemsByStatus(reservationEntity: ReservationEntity): Promise<ReservationResponseCommand[]>
}

@Injectable()
export abstract class AbstractReservationRepository implements ReservationRepositoryInterface{
    abstract reserve(reservationEntity: ReservationEntity): Promise<ReservationResponseCommand>
    abstract reservedItems(reservatioEntity: ReservationEntity): Promise<ReservationResponseCommand[]>
    abstract reservedItem(reservatioEntity: ReservationEntity): Promise<ReservationResponseCommand>
    abstract statusUpdate(reservationEntity: ReservationEntity): Promise<ReservationResponseCommand>
    abstract statusesUpdate(reservationEntity: ReservationEntity): Promise<void>
    abstract itemsByStatus(reservationEntity: ReservationEntity): Promise<ReservationResponseCommand[]>
}