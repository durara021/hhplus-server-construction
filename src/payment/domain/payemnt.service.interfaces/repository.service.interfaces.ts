import { Injectable } from "@nestjs/common";
import { PaymentEntity } from "../entities";
import { PaymentRequestModel } from "../models";
import { PaymentResponseCommand } from "../../app/commands";

interface PaymentServiceInterface{
    record(model: PaymentRequestModel): Promise<PaymentResponseCommand>
}

@Injectable()
export abstract class AbstractPaymentService implements PaymentServiceInterface{
    abstract record(model: PaymentRequestModel): Promise<PaymentResponseCommand>
}