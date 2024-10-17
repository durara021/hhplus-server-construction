import { EntityManager, Repository } from "typeorm";
import { PaymentEntity } from "../../domain/entities";
import { Injectable } from "@nestjs/common";
import { AbstractPaymentRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class PaymentRepository implements AbstractPaymentRepository {
  
  private autoManagerRepository: AutoManagerRepository<PaymentEntity>;

  constructor(
    @InjectRepository(PaymentEntity)
    private readonly repository: Repository<PaymentEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async record(paymentEntity: PaymentEntity): Promise<PaymentEntity> {
    return this.autoManagerRepository.proxyInstance.save(paymentEntity);
  }
  
}
