import { Injectable } from "@nestjs/common";
import { ConcertPlanEntity } from "../../infra/entities/concertPlan.entity";
import { ConcertResponseModel } from "../models";
import { EntityManager } from "typeorm";

interface ConcertPlanRepositoryInterface{
    planInfo(concertPlanEntity: ConcertPlanEntity, manager:EntityManager): Promise<ConcertResponseModel>;
    planInfos(concertPlanEntity: ConcertPlanEntity, manager:EntityManager): Promise<ConcertResponseModel[]>;
}

@Injectable()
export abstract class AbstractConcertPlanRepository implements ConcertPlanRepositoryInterface{
    abstract planInfo(concertPlanEntity: ConcertPlanEntity, manager:EntityManager): Promise<ConcertResponseModel>;
    abstract planInfos(concertPlanEntity: ConcertPlanEntity, manager:EntityManager): Promise<ConcertResponseModel[]>;
}