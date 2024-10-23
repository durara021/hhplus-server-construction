import { Injectable } from '@nestjs/common';
import { PaymentEntity } from './entities';
import { AbstractPaymentRepository } from './repository.interfaces';
import { AbstractPaymentService } from './payemnt.service.interfaces';
import { PaymentRequestModel } from './models';
import { PaymentResponseCommand } from '../app/commands'
import { ObjectMapper } from '../../common/mapper/object-mapper';

@Injectable()
export class PaymentService implements AbstractPaymentService{
  
  constructor(
    private readonly paymentRepository: AbstractPaymentRepository,
    private readonly objectMapper: ObjectMapper,
  ) {}

  async record(model: PaymentRequestModel): Promise<PaymentResponseCommand>{
    return this.objectMapper.mapObject(await this.paymentRepository.record(this.objectMapper.mapObject(model, PaymentEntity)),  PaymentResponseCommand);
  }

}
