import { Injectable } from "@nestjs/common";
import { AbstractConcertService } from "../../concert/domain/service.interfaces";
import { AbastractReservationComponent } from "../domain/component.interfaces/reservation.component.interface";

@Injectable()
export class reservationComponent implements AbastractReservationComponent{
    
    constructor(
        private readonly concertService: AbstractConcertService,
    ) {}

    async reserve(categoryId: number, itemId: number, userId: number) {
        const capacity = (await this.concertService.concertPlanInfo(categoryId)).capacity;
        const reserveResult = await this.concertService.reserve(itemId, userId, capacity);
        return reserveResult.id;
    }
}