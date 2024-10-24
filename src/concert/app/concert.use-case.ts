import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { ConcertGetResponseDto as ResGetDto } from "../pres/dto";
import { AbstractReservationService } from '../../reservation/domain/service.interfaces';
import { ConcertRequestCommand } from './commands'; 
import { ConcertRequestModel } from '../domain/models';
import { ObjectMapper } from '../../common/mapper/object-mapper';
import { ReservationRequestModel } from '../../reservation/domain/models';
import { AbstractConcertService } from '../domain/service.interfaces';

@Injectable()
export class ConcertUsecase {

    constructor(
        private readonly concertService: AbstractConcertService,
        private readonly reservationService: AbstractReservationService,
        private readonly objectMapper: ObjectMapper,
        private readonly dataSource: DataSource,
    ) {}

    //콘서트 예약가능일 조회
    async dates(command: ConcertRequestCommand): Promise<ResGetDto> {
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            //콘서트 정보 조회
            const info = await this.concertService.info(this.objectMapper.mapObject(command, ConcertRequestModel), manager);
            
            //콘서트 예약가능일 조회
            const plans = await this.concertService.planInfos(this.objectMapper.mapObject(info, ConcertRequestModel), manager);

            return this.objectMapper.mapObject(plans, ResGetDto);
        });
    }

    //콘서트 예약가능좌석 조회
    async seats(command: ConcertRequestCommand): Promise<ResGetDto> {
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            //콘서트 일정 조회
            const planInfo = await this.concertService.planInfo(this.objectMapper.mapObject(command, ConcertRequestModel), manager);

            //콘서트 일정의 예약 가능한 자리 조회
            const reserveReqMod = new ReservationRequestModel();
            reserveReqMod.mainCateg = 1;
            reserveReqMod.subCateg = planInfo.id;
            
            const seats = (await this.reservationService.reservedItems(reserveReqMod, manager)).map(seat => seat.minorCateg);
            const concertModel = this.objectMapper.mapObject(planInfo, ConcertRequestModel);
            concertModel.updateSeats(seats);
            const availableSeats = await this.concertService.availableSeats(concertModel, manager);

            return this.objectMapper.mapObject(availableSeats, ResGetDto);
        });
    }
}
