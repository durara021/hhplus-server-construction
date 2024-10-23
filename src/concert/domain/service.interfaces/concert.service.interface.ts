import { Injectable } from '@nestjs/common';
import { ConcertRequestModel } from '../models';
import { ConcertResponseCommand } from 'src/concert/app/commands';

interface ConcertServiceInterface  {
  info(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand>
  availableSeats(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand>
  planInfos(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand> 
  planInfo(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand>
}

@Injectable()
export abstract class AbstractConcertService implements ConcertServiceInterface {
  abstract info(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand>
  abstract availableSeats(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand>
  abstract planInfos(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand>
  abstract planInfo(RequestModel: ConcertRequestModel): Promise<ConcertResponseCommand>
} 