import { Injectable } from "@nestjs/common";
import { Column, PrimaryGeneratedColumn } from "typeorm";

@Injectable()
export class PaymentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    reservationId: number;

    @Column({default: Date.now()})
    regDate: Date;
}
