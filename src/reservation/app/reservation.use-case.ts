import { Injectable } from '@nestjs/common';
import { ReservationGetResponseDto as ResGetDto, ReservationPostResponseDto as ResPostDto } from "../pres/dto";
import { AbstractReservationService } from '../domain/service.interfaces/reservation.service.interface';
import { DataSource } from 'typeorm';

@Injectable()
export class ReservationUsecase {

    constructor(
        private readonly reservationService: AbstractReservationService,
        private readonly dataSource: DataSource
    ) {}

    //임시 예약
    async reserve(mainCateg: number, subCateg:number, minorCateg:number, userId:number): Promise<ResPostDto> {
        return await this.dataSource.transaction(async () => {
            //예약 가능 여부 확인
            await this.reservationService.isAvailableItem(mainCateg, subCateg, minorCateg);

            //임시 예약
            const reserveResult = await this.reservationService.reserve(mainCateg, subCateg, minorCateg, userId);

            return new ResPostDto(reserveResult.mainCateg, reserveResult.subCateg, reserveResult.minorCateg, reserveResult.userId, reserveResult.regDate, reserveResult.status, reserveResult.modDate);
        });
    }

}
