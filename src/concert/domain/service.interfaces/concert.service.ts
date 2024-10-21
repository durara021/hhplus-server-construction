import { Injectable } from '@nestjs/common';
import { ConcertEntity, ConcertPlanEntity } from '../entities';

interface ConcertServiceInterface  {
  concertInfo(concertId: number): Promise<ConcertEntity>
  concertPlanInfos(concertId: number): Promise<Date[]> 
  concertPlanInfo(concertPlanId: number): Promise<ConcertPlanEntity>
}

@Injectable()
export abstract class AbstractConcertService implements ConcertServiceInterface {
  abstract concertInfo(concertId: number): Promise<ConcertEntity>
  abstract concertPlanInfos(concertId: number): Promise<Date[]>
  abstract concertPlanInfo(concertPlanId: number): Promise<ConcertPlanEntity>
} 