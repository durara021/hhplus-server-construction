import { Module } from '@nestjs/common';
import { PaymentService } from './app/payment.service';
import { PaymentController } from './pres/payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from './domain/entities';
import { AbstractPaymentService } from './domain/payemnt.service.interfaces';
import { AbstractPaymentRepository } from './domain/repository.interfaces';
import { PaymentRepository } from './infra/payment.repositories/payment.repository';
import { PaymentUsecase } from './app/payment.use-case';
import { ReservationModule } from '../reservation/reservation.module';
import { AbstractPaymentComponent } from './domain/component.interfaces';
import { PaymentComponent } from './app/payment.component';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [ TypeOrmModule.forFeature([PaymentEntity]), ReservationModule, AccountModule ],
  controllers: [PaymentController],
  providers: [
    PaymentUsecase, 
    { provide: AbstractPaymentComponent, useClass: PaymentComponent},
    { provide: AbstractPaymentService, useClass: PaymentService },
    { provide: AbstractPaymentRepository, useClass: PaymentRepository }
  ],
  exports: [AbstractPaymentService]
})
export class PaymentModule {}
