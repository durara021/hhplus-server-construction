import { Injectable } from '@nestjs/common';
import { QueueEntity } from '../../infra/repositories/entities';
import { QueueRequestModel } from '../models';
import { QueueResponseCommand } from 'src/queue/app/commands';

interface QueueServiceInterface {
  enter(model: QueueRequestModel): Promise<QueueResponseCommand>
  myPosition(model: QueueRequestModel):Promise<QueueResponseCommand>
  expire(model: QueueRequestModel): Promise<QueueResponseCommand>
  myQueueInfo(model: QueueRequestModel): Promise<QueueResponseCommand>
}

@Injectable()
export abstract class AbstractQueueService implements QueueServiceInterface {
  abstract enter(model: QueueRequestModel): Promise<QueueResponseCommand>
  abstract myPosition(model: QueueRequestModel):Promise<QueueResponseCommand>
  abstract expire(model: QueueRequestModel): Promise<QueueResponseCommand>
  abstract myQueueInfo(model: QueueRequestModel): Promise<QueueResponseCommand>
}