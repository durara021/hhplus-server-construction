import { Injectable } from '@nestjs/common';
import { ConcertRequestModel } from '../models';
import { ConcertResponseCommand } from '../../app/commands';
import { EntityManager } from 'typeorm';

interface ConcertServiceInterface  {
  info(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand>
  availableSeats(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand>
  planInfos(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand> 
  planInfo(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand>
}

@Injectable()
export abstract class AbstractConcertService implements ConcertServiceInterface {
  abstract info(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand>
  abstract availableSeats(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand>
  abstract planInfos(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand>
  abstract planInfo(RequestModel: ConcertRequestModel, manager:EntityManager): Promise<ConcertResponseCommand>
} 