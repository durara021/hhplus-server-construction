import { EntityManager } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AbstractConcertPlanRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { ConcertPlanEntity } from "../entities";
import { ObjectMapper } from "../../../common/mapper/object-mapper";
import { ConcertResponseModel } from "../../../concert/domain/models";

@Injectable()
export class ConcertPlanRepository implements AbstractConcertPlanRepository {

  constructor(
    @InjectRepository(ConcertPlanEntity)
    private readonly objectMapper: ObjectMapper,
  ) {}

  async planInfo(concertPlanEntity:ConcertPlanEntity, manager:EntityManager): Promise<ConcertResponseModel | null> {
    return this.objectMapper.mapObject((await manager.findOne(ConcertPlanEntity, {where: { concertId: concertPlanEntity.concertId }})), ConcertResponseModel);
  }

  async planInfos(concertPlanEntity:ConcertPlanEntity, manager:EntityManager): Promise<ConcertResponseModel[]> {
    return this.objectMapper.mapArray((await manager.find(ConcertPlanEntity, {where: {concertId: concertPlanEntity.concertId}})), ConcertResponseModel);
  }

}
