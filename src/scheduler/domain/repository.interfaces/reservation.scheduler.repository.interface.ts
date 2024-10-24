import { Injectable } from "@nestjs/common";
import { ReservationSchedulerEntity } from "../../infra/entities";
import { ReservationEntity } from "../../../reservation/infra/entities";
import { EntityManager } from "typeorm";

interface ReservationSchedulerRepositoryInterface{
    items(reservationSchedulerEntity: ReservationSchedulerEntity, manager: EntityManager): Promise<ReservationEntity[]>
    updateStatus(reservationSchedulerEntity: ReservationSchedulerEntity, manager: EntityManager): Promise<number>
}

@Injectable()
export abstract class AbstractReservationSchedulerRepository implements ReservationSchedulerRepositoryInterface{
    abstract items(reservationSchedulerEntity: ReservationSchedulerEntity, manager: EntityManager): Promise<ReservationEntity[]>
    abstract updateStatus(reservationSchedulerEntity: ReservationSchedulerEntity, manager: EntityManager): Promise<number>
}
