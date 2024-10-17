import { Injectable } from "@nestjs/common";
import { ConcertPlanEntity } from "../entities/concertPlan.entity";

interface ConcertPlanRepositoryInterface{
    concertPlanInfo(concertPlanEntity: ConcertPlanEntity): Promise<ConcertPlanEntity>;
    concertPlanInfos(concertPlanEntity: ConcertPlanEntity): Promise<ConcertPlanEntity[]>;
}

@Injectable()
export abstract class AbstractConcertPlanRepository implements ConcertPlanRepositoryInterface{
    abstract concertPlanInfo(concertPlanEntity: ConcertPlanEntity): Promise<ConcertPlanEntity>;
    abstract concertPlanInfos(concertPlanEntity: ConcertPlanEntity): Promise<ConcertPlanEntity[]>;
}