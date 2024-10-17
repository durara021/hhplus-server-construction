import { Injectable } from "@nestjs/common";
import { PaymentEntity } from "../entities";

interface PaymentServiceInterface{
    record(userId: number, price:number): Promise<PaymentEntity>
}

@Injectable()
export abstract class AbstractPaymentService implements PaymentServiceInterface{
    abstract record(userId: number, price: number): Promise<PaymentEntity>
}