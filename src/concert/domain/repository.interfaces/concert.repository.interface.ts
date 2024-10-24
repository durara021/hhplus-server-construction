import { Injectable } from "@nestjs/common";
import { ConcertEntity } from "../../infra/entities/concert.entity";
import { ConcertResponseModel } from "../models";
import { EntityManager } from "typeorm";

interface ConcertRepositoryInterface{
    info(concertEntity: ConcertEntity, manager:EntityManager): Promise<ConcertResponseModel>;
}

@Injectable()
export abstract class AbstractConcertRepository implements ConcertRepositoryInterface{
    abstract info(concertEntity: ConcertEntity, manager:EntityManager): Promise<ConcertResponseModel>;
}