import { Injectable } from '@nestjs/common';
import { ConcertEntity, ConcertPlanEntity, ConcertTicketEntity } from '../entities';

interface ConcertServiceInterface  {
  concertInfo(concertId: number): Promise<ConcertEntity>
  concertPlans(concertId: number): Promise<Date[]> 
  concertPlanInfo(concertPlanId: number): Promise<ConcertPlanEntity>
  availableSeats(concertPlanId: number, capacity: number): Promise<number[]>
  reserve(concertTicketId:number, userId: number, capacity: number):Promise<ConcertTicketEntity>
}

@Injectable()
export abstract class AbstractConcertService implements ConcertServiceInterface {
  abstract concertInfo(concertId: number): Promise<ConcertEntity>
  abstract concertPlans(concertId: number): Promise<Date[]>
  abstract concertPlanInfo(concertPlanId: number): Promise<ConcertPlanEntity>
  abstract availableSeats(concertPlanId: number, capacity: number): Promise<number[]>
  abstract reserve(concertTicketId:number, userId: number, capacity: number):Promise<ConcertTicketEntity>
} 