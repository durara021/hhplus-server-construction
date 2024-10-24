import { EntityManager } from "typeorm";
import { PaymentEntity } from "../entities";
import { Injectable } from "@nestjs/common";
import { AbstractPaymentRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentResponseModel } from "../../domain/models";
import { ObjectMapper } from "../../../common/mapper/object-mapper";

@Injectable()
export class PaymentRepository implements AbstractPaymentRepository {
  
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly objectMapper: ObjectMapper,
  ) {}

  async record(paymentEntity: PaymentEntity, manager: EntityManager): Promise<PaymentEntity> {
    return this.objectMapper.mapObject((await manager.save(paymentEntity)), PaymentResponseModel);
  }
  
}
