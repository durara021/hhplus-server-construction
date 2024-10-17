import { Injectable } from '@nestjs/common';
import { ReservationGetResponseDto as ResGetDto, ReservationPostResponseDto as ResPostDto } from "../pres/dto";
import { AbstractReservationService } from '../domain/service.interfaces/reservation.service.interface';
import { AbastractReservationComponent } from '../domain/component.interfaces/reservation.component.interface'; 
import { DataSource } from 'typeorm';

@Injectable()
export class ReservationUsecase {

    constructor(
        private readonly reservationService: AbstractReservationService,
        private readonly reservationComponent: AbastractReservationComponent,
        private readonly dataSource: DataSource
    ) {}

    //임시 예약
    async reserve(category:string, categoryId:number, itemId:number, userId:number): Promise<ResPostDto> {
        return await this.dataSource.transaction(async () => {
            const availableSeats = await this.reservationComponent.availableSeats(categoryId, itemId);

            if(! availableSeats.includes(itemId)) throw new Error("선택할 수 없는 좌석입니다.");
            
            //임시 예약
            const reserveResult = await this.reservationService.reserve(category, categoryId, itemId, userId);

            if(reserveResult){
                this.reservationComponent.reserve(categoryId, itemId, userId);
            }

            return new ResPostDto(reserveResult.category, reserveResult.categoryId, reserveResult.itemId, reserveResult.userId, reserveResult.regDate, reserveResult.status, reserveResult.modDate);
        });
    }

}
