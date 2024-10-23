import { Injectable } from "@nestjs/common";
import { ConcertEntity } from "../../infra/entities/concert.entity";
import { ConcertResponseModel } from "../models";

interface ConcertRepositoryInterface{
    info(concertEntity: ConcertEntity): Promise<ConcertResponseModel>;
}

@Injectable()
export abstract class AbstractConcertRepository implements ConcertRepositoryInterface{
    abstract info(concertEntity: ConcertEntity): Promise<ConcertResponseModel>;
}