import { Injectable } from "@nestjs/common";

interface ReservationComponentInterface {
    reserve(categoryId: number, itemId: number, userId: number): Promise<number>;
}

@Injectable()
export abstract class AbastractReservationComponent implements ReservationComponentInterface {
    abstract reserve(categoryId: number, itemId: number, userId: number): Promise<number> 
}