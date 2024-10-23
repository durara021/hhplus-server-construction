import { Injectable } from "@nestjs/common";
import { ConcertPlanEntity } from "../../infra/entities/concertPlan.entity";
import { ConcertResponseModel } from "../models";

interface ConcertPlanRepositoryInterface{
    planInfo(concertPlanEntity: ConcertPlanEntity): Promise<ConcertResponseModel>;
    planInfos(concertPlanEntity: ConcertPlanEntity): Promise<ConcertResponseModel[]>;
}

@Injectable()
export abstract class AbstractConcertPlanRepository implements ConcertPlanRepositoryInterface{
    abstract planInfo(concertPlanEntity: ConcertPlanEntity): Promise<ConcertResponseModel>;
    abstract planInfos(concertPlanEntity: ConcertPlanEntity): Promise<ConcertResponseModel[]>;
}