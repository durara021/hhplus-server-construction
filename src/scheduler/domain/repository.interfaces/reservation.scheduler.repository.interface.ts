import { Injectable } from "@nestjs/common";
import { ReservationSchedulerEntity } from "../entities";
import { ReservationResponseEntity } from "../../../reservation/infra/entities";

interface ReservationSchedulerRepositoryInterface{
    items(reservationSchedulerEntity: ReservationSchedulerEntity): Promise<ReservationResponseEntity[]>
    updateStatus(reservationSchedulerEntity: ReservationSchedulerEntity): Promise<number>
}

@Injectable()
export abstract class AbstractReservationSchedulerRepository implements ReservationSchedulerRepositoryInterface{
    abstract items(reservationSchedulerEntity: ReservationSchedulerEntity): Promise<ReservationResponseEntity[]>
    abstract updateStatus(reservationSchedulerEntity: ReservationSchedulerEntity): Promise<number>
}
