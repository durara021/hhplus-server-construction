import { Injectable } from "@nestjs/common";
import { AbstractAccountService } from "../../account/domain/service.interfaces";
import { AbstractPaymentComponent } from "../domain/component.interfaces/payment.component.interface";
import { ReservationEntity } from "../../reservation/domain/entities";
import { AbstractReservationService } from "../../reservation/domain/service.interfaces";

@Injectable()
export class PaymentComponent implements AbstractPaymentComponent{
    
    constructor(
        private readonly accountService: AbstractAccountService,
        private readonly reservationService: AbstractReservationService,
    ) {}

    async use(userId: number, amount: number): Promise<number> {

        const point = await this.accountService.point(userId);
        const balance = point.balance - amount;

        if(balance < 0) throw new Error("보유하신 포인트의 양이 충분하지 않습니다.");

        const useResult = await this.accountService.use(userId, balance);

        if(useResult) await this.accountService.record(userId, amount, 'use');

        return useResult.userId;
    }

    async book(reservationId: number, status: string): Promise<ReservationEntity> {
        return this.reservationService.book(reservationId, status);
    }

}