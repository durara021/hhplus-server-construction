import { Injectable } from "@nestjs/common";
import { PaymentEntity } from "../entities/payment.entity"; 
import { PaymentResponseModel } from "../../domain/models";
interface PaymentRepositoryInterface{
    record(paymentEntity: PaymentEntity): Promise<PaymentResponseModel>
}

@Injectable()
export abstract class AbstractPaymentRepository implements PaymentRepositoryInterface{
    abstract record(paymentEntity: PaymentEntity): Promise<PaymentResponseModel>
}