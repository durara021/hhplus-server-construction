import { Injectable } from "@nestjs/common";
import { ReservationRequestEntity, ReservationEntity } from "../../infra/entities";
import { ReservationResponseCommand } from "../../app/commands";
import { EntityManager } from "typeorm";
interface ReservationRepositoryInterface{
    reserve(reservationEntity: ReservationEntity, manager: EntityManager): Promise<ReservationResponseCommand>
    reservedItems(reservatioEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand[]>
    reservedItem(reservatioEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand>
    statusUpdate(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand>
    statusesUpdate(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<void>
    itemsByStatus(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand[]>
}

@Injectable()
export abstract class AbstractReservationRepository implements ReservationRepositoryInterface{
    abstract reserve(reservationEntity: ReservationEntity, manager: EntityManager): Promise<ReservationResponseCommand>
    abstract reservedItems(reservatioEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand[]>
    abstract reservedItem(reservatioEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand>
    abstract statusUpdate(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand>
    abstract statusesUpdate(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<void>
    abstract itemsByStatus(reservationEntity: ReservationRequestEntity, manager: EntityManager): Promise<ReservationResponseCommand[]>
}