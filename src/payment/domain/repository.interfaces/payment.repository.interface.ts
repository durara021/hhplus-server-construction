import { Injectable } from "@nestjs/common";
import { PaymentEntity } from "../entities/payment.entity"; 

interface PaymentRepositoryInterface{
    record(paymentEntity: PaymentEntity): Promise<PaymentEntity>
}

@Injectable()
export abstract class AbstractPaymentRepository implements PaymentRepositoryInterface{
    abstract record(paymentEntity: PaymentEntity): Promise<PaymentEntity>
}