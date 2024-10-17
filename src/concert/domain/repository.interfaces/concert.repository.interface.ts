import { Injectable } from "@nestjs/common";
import { ConcertEntity } from "../entities/concert.entity";

interface ConcertRepositoryInterface{
    concertInfo(concertEntity: ConcertEntity): Promise<ConcertEntity>;
}

@Injectable()
export abstract class AbstractConcertRepository implements ConcertRepositoryInterface{
    abstract concertInfo(concertEntity: ConcertEntity): Promise<ConcertEntity>;
}