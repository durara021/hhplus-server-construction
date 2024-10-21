import { Injectable, NotFoundException } from '@nestjs/common';
import { ConcertEntity, ConcertPlanEntity } from './entities';
import { AbstractConcertRepository, AbstractConcertPlanRepository } from './repository.interfaces';
import { AbstractConcertService } from './service.interfaces/concert.service';

@Injectable()
export class ConcertService implements AbstractConcertService{

  constructor(
    private readonly concertRepository: AbstractConcertRepository,
    private readonly concertPlanRepository: AbstractConcertPlanRepository,
  ) {}

  //콘서트 정보 조회
  async concertInfo(concertId:number): Promise<ConcertEntity> {
    const concertEntity = new ConcertEntity();
    concertEntity.id = concertId;

    //콘서트 정보 조회
    const concertInfo = await this.concertRepository.concertInfo(concertEntity);
    if (!concertInfo) {
      throw new NotFoundException('콘서트 정보가 조회되지 않습니다.');
    }

    return concertInfo;
  }

  //콘서트 일정 정보 조회  
  async concertPlanInfos(concertId: number): Promise<Date[]> {

    const concertPlanEntity = new ConcertPlanEntity();
    concertPlanEntity.concertId = concertId;

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
    concertPlanEntity.id = concertPlanId;
    
    //콘서트 일정 정보 조회(단일)
    const concertPlanInfo = await this.concertPlanRepository.concertPlanInfo(concertPlanEntity);
    if(!concertPlanInfo) throw new NotFoundException("해당 콘서트에 대한 일정이 존재하지 않습니다.");
    return concertPlanInfo
  }
  
}
