import { Injectable } from "@nestjs/common";
import { AbstractPaymentService } from '../domain/payemnt.service.interfaces';
import { AbstractPaymentComponent } from "../domain/component.interfaces/payment.component.interface";
import { PaymentPostResponseDto as ResPostDto } from '../pres/dto';
import { PaymentEntity } from "../domain/entities";
import { DataSource } from "typeorm";

@Injectable()
export class PaymentUsecase {

    constructor(
        private readonly paymentComponent: AbstractPaymentComponent,
        private readonly paymentService: AbstractPaymentService,
        private readonly dataSource: DataSource
    ) {}

    async pay(userId: number, reservationId: number, price:number,): Promise<ResPostDto>{
        return await this.dataSource.transaction(async () => {
            const payResult = this.paymentComponent.use(userId, price);
            let recordResult: PaymentEntity;
            if(payResult) {
                await this.paymentComponent.book(reservationId, 'confirmed');
                recordResult = await this.paymentService.record(userId, reservationId);
            }

            return new ResPostDto(recordResult.userId, recordResult.reservationId, recordResult.regDate);
        });
    }
}
