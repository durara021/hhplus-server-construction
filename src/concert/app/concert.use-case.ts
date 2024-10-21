import { Injectable } from '@nestjs/common';
import { ConcertGetResponseDto as ResGetDto } from "../pres/dto";
import { AbstractConcertService } from '../domain/service.interfaces/concert.service';
import { DataSource } from 'typeorm';
import { AbstractReservationService } from '../../reservation/domain/service.interfaces';

@Injectable()
export class ConcertUsecase {

    constructor(
        private readonly concertService: AbstractConcertService,
        private readonly reservationService: AbstractReservationService,
        private readonly dataSource: DataSource
    ) {}

    //콘서트 정보 조회
    async concertDates(concertId: number): Promise<ResGetDto> {
        return await this.dataSource.transaction(async () => {
            const concerInfo = await this.concertService.concertInfo(concertId);
            
            //콘서트 예약가능일 조회
            const concertPlans = await this.concertService.concertPlanInfos(concerInfo.id);
            return new ResGetDto(concerInfo.title, null, concertPlans, null );
        });
    }

    //콘서트 좌석 조회
    async concertSeats(concertPlanId: number): Promise<ResGetDto> {
        return await this.dataSource.transaction(async () => {
            //콘서트 일정 조회
            const concertPlanInfo = await this.concertService.concertPlanInfo(concertPlanId);

            //콘서트 일정의 예약 가능한 자리 조회
            const concertSeats = await this.reservationService.availableItems(1, concertPlanId, concertPlanInfo.capacity);

            return new ResGetDto(null, concertPlanInfo.concertDate, null, concertSeats);
        });
    }
}
