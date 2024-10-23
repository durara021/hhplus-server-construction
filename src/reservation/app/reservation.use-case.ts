import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ReservationPostResponseDto as ResPostDto } from "../pres/dto";
import { AbstractReservationService } from '../domain/service.interfaces/reservation.service.interface';
import { ReservationRequestCommand } from './commands';
import { ReservationRequestModel } from '../domain/models';
import { ObjectMapper } from '../../common/mapper/object-mapper';

@Injectable()
export class ReservationUsecase {

    constructor(
        private readonly reservationService: AbstractReservationService,
        private readonly dataSource: DataSource,
        private readonly objectMapper: ObjectMapper
    ) {}

    //임시 예약
    async reserve(command: ReservationRequestCommand): Promise<ResPostDto> {
        return await this.dataSource.transaction(async () => {
            //예약 가능 여부 확인
            await this.reservationService.isAvailableItem(this.objectMapper.mapObject(command, ReservationRequestModel));

            //임시 예약
            const reserveResult = await this.reservationService.reserve(this.objectMapper.mapObject(command, ReservationRequestModel));

            return this.objectMapper.mapObject(reserveResult, ResPostDto);
        });
    }

}
