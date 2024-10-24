import { Injectable, NotFoundException } from '@nestjs/common';
import { ConcertEntity, ConcertPlanEntity } from '../infra/entities';
import { AbstractConcertRepository, AbstractConcertPlanRepository } from './repository.interfaces';
import { AbstractConcertService } from './service.interfaces';
import { ConcertRequestModel, ConcertResponseModel } from './models';
import { ConcertResponseCommand } from '../app/commands';
import { ObjectMapper } from '../../common/mapper/object-mapper';
import { EntityManager } from 'typeorm';

@Injectable()
export class ConcertService implements AbstractConcertService{

  constructor(
    private readonly concertRepository: AbstractConcertRepository,
    private readonly concertPlanRepository: AbstractConcertPlanRepository,
    private readonly objectMapper: ObjectMapper,
  ) {}

  // 콘서트 정보 조회
  async info(model: ConcertRequestModel, manager: EntityManager): Promise<ConcertResponseCommand> {

    //콘서트 정보 조회
    const concertInfo = await this.concertRepository.info(this.objectMapper.mapObject(model, ConcertEntity), manager);
    if (!concertInfo) {
      throw new NotFoundException('콘서트 정보가 조회되지 않습니다.');
    }

    return this.objectMapper.mapObject(concertInfo, ConcertResponseCommand);
  }

  // 예약 가능한 좌석 조회
  async availableSeats(model: ConcertRequestModel, manager: EntityManager): Promise<ConcertResponseCommand> {
    
    const allItems = Array.from({ length: model.capacity }, (_, i) => i + 1);
    const availableItems = allItems.filter(item => !model.concertSeats.includes(item));
    model.updateSeats(availableItems);

    return this.objectMapper.mapObject(model, ConcertResponseCommand);
  }

  // 콘서트 일정 정보 조회  
  async planInfos(model: ConcertRequestModel, manager: EntityManager): Promise<ConcertResponseCommand> {

    // 콘서트 계획 정보 조회
    const concertPlans = await this.concertPlanRepository.planInfos(this.objectMapper.mapObject(model, ConcertPlanEntity), manager);
    if (!concertPlans || concertPlans.length === 0) {
      throw new NotFoundException('콘서트 일정을 찾을 수 없습니다.');
    }

    const responseModel = this.objectMapper.mapObject(model, ConcertResponseModel);
    responseModel.updateConcertDates(concertPlans.filter(concertPlan=> concertPlan.capacity > concertPlan.current).map(concertPlan=>concertPlan.concertDate));

    // 콘서트 계획 날짜 반환
    return this.objectMapper.mapObject(responseModel, ConcertResponseCommand);
  }

  // 콘서트 일정 정보 조회(단일)
  async planInfo(model: ConcertRequestModel, manager: EntityManager): Promise<ConcertResponseCommand> {
    
    // 콘서트 일정 정보 조회(단일)
    const planInfo = await this.concertPlanRepository.planInfo(this.objectMapper.mapObject(model, ConcertPlanEntity), manager);
    if(!planInfo) throw new NotFoundException("해당 콘서트에 대한 일정이 존재하지 않습니다.");
    
    return this.objectMapper.mapObject(planInfo, ConcertResponseCommand);
  }
  
}
