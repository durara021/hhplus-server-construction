import { Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { AbstractPaymentService } from '../domain/payemnt.service.interfaces';
import { PaymentPostResponseDto as ResPostDto } from '../pres/dto';
import { AbstractAccountService } from "../../account/domain/service.interfaces";
import { AbstractQueueService } from "../../queue/domain/service.interfaces";
import { AbstractReservationService } from "../../reservation/domain/service.interfaces";
import { ObjectMapper } from "src/common/mapper/object-mapper";
import { PaymentRequestCommand } from "./commands";
import { AccountRequestModel } from '../../account/domain/models';
import { PaymentRequestModel } from '../../payment/domain/models';
import { ReservationRequestModel } from '../../reservation/domain/models';
import { QueueRequestModel } from '../../queue/domain/models';

@Injectable()
export class PaymentUsecase {

    constructor(
        private readonly paymentService: AbstractPaymentService,
        private readonly accountService: AbstractAccountService,
        private readonly reservationService: AbstractReservationService,
        private readonly queueService: AbstractQueueService,
        private readonly dataSource: DataSource,
        private readonly objectMapper: ObjectMapper,
    ) {}

    async pay(command: PaymentRequestCommand): Promise<ResPostDto>{
        return await this.dataSource.transaction(async () => {
            //계좌 point 차감
            const balance = (await this.accountService.point(this.objectMapper.mapObject(command, AccountRequestModel)));
            let acouuntReqModel = this.objectMapper.mapObject(balance, AccountRequestModel);
            acouuntReqModel.updateAmount(command.price);
            acouuntReqModel = this.objectMapper.mapObject((await this.accountService.use(acouuntReqModel)), AccountRequestModel);
            await this.accountService.update(acouuntReqModel);

            //예약 확정
            const reservationReqModel = this.objectMapper.mapObject(command, ReservationRequestModel);
            reservationReqModel.updateStatus('confirmed');
            await this.reservationService.reserve(reservationReqModel);

            const recordResult = await this.paymentService.record(this.objectMapper.mapObject(command, PaymentRequestModel));
            await this.queueService.expire(this.objectMapper.mapObject(command, QueueRequestModel));
            
            return this.objectMapper.mapObject(recordResult, ResPostDto);
        });
    }
}
