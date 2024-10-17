import { Injectable, NotFoundException } from '@nestjs/common';
import { ConcertEntity, ConcertPlanEntity, ConcertTicketEntity } from '../domain/entities';
import { AbstractConcertRepository, AbstractConcertPlanRepository, AbstractConcertTicketRepository, } from '../domain/repository.interfaces';
import { AbstractConcertService } from '../domain/service.interfaces/concert.service';

@Injectable()
export class ConcertService implements AbstractConcertService{

  constructor(
    private readonly concertRepository: AbstractConcertRepository,
    private readonly concertPlanRepository: AbstractConcertPlanRepository,
    private readonly concertTicketRepository: AbstractConcertTicketRepository,
  ) {}

  //콘서트 정보 조회
  async concertInfo(concertId:number): Promise<ConcertEntity> {
    const concertEntity = new ConcertEntity();
    concertEntity.id = this.isValidNum(concertId, 'concertId');

    //콘서트 정보 조회
    const concertInfo = await this.concertRepository.concertInfo(concertEntity);
    if (!concertInfo) {
      throw new NotFoundException('콘서트 정보가 조회되지 않습니다.');
    }

    return concertInfo;
  }

  //콘서트 일정 정보 조회  
  async concertPlans(concertId: number): Promise<Date[]> {

    const concertPlanEntity = new ConcertPlanEntity();
    concertPlanEntity.concertId = this.isValidNum(concertId, 'concertId');

    // 콘서트 계획 정보 조회
    const concertPlans = await this.concertPlanRepository.concertPlanInfos(concertPlanEntity);
    if (!concertPlans || concertPlans.length === 0) {
      throw new NotFoundException('콘서트 일정을 찾을 수 없습니다.');
    }

    // 콘서트 계획 날짜 반환
    return concertPlans.map(plan => plan.concertDate);
  }

  //콘서트 일정 정보 조회(단일)
  async concertPlanInfo(concertPlanId: number): Promise<ConcertPlanEntity> {
    const concertPlanEntity = new ConcertPlanEntity();
    concertPlanEntity.id = this.isValidNum(concertPlanId, 'concertPlanId');
    
    //콘서트 일정 정보 조회(단일)
    return await this.concertPlanRepository.concertPlanInfo(concertPlanEntity);
  }

  //예약가능한 좌석 조회
  async availableSeats(concertPlanId: number, capacity: number): Promise<number[]> {
    const concertTicketEntity = new ConcertTicketEntity();
    concertTicketEntity.concertPlanId = this.isValidNum(concertPlanId, 'concertPlanId');

    // 예약된 좌석 조회
    const reservedTickets = await this.concertTicketRepository.reservedTickets(concertTicketEntity);

    // 예약된 좌석 번호 추출
    const reservedSeats = reservedTickets.map(ticket => ticket.seatNum);

    // 전체 좌석 생성
    const allSeats = Array.from({ length: this.isValidNum(capacity, 'capacity') }, (_, i) => i + 1);

    // 예약된 좌석을 제외한 사용 가능한 좌석 필터링
    const availableSeats = allSeats.filter(seat => !reservedSeats.includes(seat));

    return availableSeats;
  }

  //티켓 임시 예약
  async reserve(seatNum:number, userId: number):Promise<ConcertTicketEntity>{
    const concertTicketEntity: ConcertTicketEntity = new ConcertTicketEntity();
    concertTicketEntity.seatNum = this.isValidNum(seatNum, 'ticketId');
    concertTicketEntity.userId = this.isValidNum(userId, 'userId');

    return this.concertTicketRepository.reserve(concertTicketEntity);
  }

    // 사용 가능한 숫자인지 확인(양의 정수)
	private isValidNum(num: any, gubun: string): number{
		if(Number.isInteger(num) && num > 0) return num;
		throw new Error(`${num}는 입력할 수 없는 ${gubun}형식입니다.`);
	}

}
