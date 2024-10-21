import { Injectable } from '@nestjs/common';
import { PaymentEntity } from './entities';
import { AbstractPaymentRepository } from './repository.interfaces';
import { AbstractPaymentService } from './payemnt.service.interfaces';

@Injectable()
export class PaymentService implements AbstractPaymentService{
  
  constructor(
    private readonly paymentRepository: AbstractPaymentRepository,
  ) {}

  async record(userId: number, reservationId: number){
    
    const paymentEntity: PaymentEntity = new PaymentEntity();
    paymentEntity.userId = userId;
    paymentEntity.reservationId = reservationId;

    return this.paymentRepository.record(paymentEntity);
  }

}
