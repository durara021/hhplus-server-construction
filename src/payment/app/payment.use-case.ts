import { Injectable } from "@nestjs/common";
import { AbstractPaymentService } from '../domain/payemnt.service.interfaces';
import { PaymentPostResponseDto as ResPostDto } from '../pres/dto';
import { DataSource } from "typeorm";
import { AbstractAccountService } from "../../account/domain/service.interfaces";
import { AbstractQueueService } from "../../queue/domain/service.interfaces";
import { AbstractReservationService } from "../../reservation/domain/service.interfaces";

@Injectable()
export class PaymentUsecase {

    constructor(
        private readonly paymentService: AbstractPaymentService,
        private readonly accountService: AbstractAccountService,
        private readonly reservationService: AbstractReservationService,
        private readonly queueService: AbstractQueueService,
        private readonly dataSource: DataSource
    ) {}

    async pay(userId: number, reservationId: number, price:number,): Promise<ResPostDto>{
        return await this.dataSource.transaction(async () => {
            const beforeBalance = (await this.accountService.point(userId)).balance;
            const balance = await this.accountService.use(beforeBalance, price);
            await this.accountService.update(userId, balance);

            await this.reservationService.book(reservationId, 'confirmed');

            const recordResult = await this.paymentService.record(userId, price);
            await this.queueService.expire(userId);
            
            return new ResPostDto(recordResult.userId, recordResult.reservationId, recordResult.regDate);
        });
    }
}
