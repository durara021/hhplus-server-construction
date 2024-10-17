import { Injectable } from "@nestjs/common";
import { ReservationEntity } from "src/reservation/domain/entities";

interface PaymentComponentInterface {
    use(userId:number, price:number): Promise<number>
    book(reservationId: number, stat:string): Promise<ReservationEntity>
}

@Injectable()
export abstract class AbstractPaymentComponent implements PaymentComponentInterface {
    abstract use(userId:number, price:number): Promise<number>
    abstract book(reservationId: number, stat:string): Promise<ReservationEntity>
}