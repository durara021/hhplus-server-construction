import { Injectable } from '@nestjs/common';
import { QueueRequestModel } from '../models';
import { QueueResponseCommand } from '../../app/commands';
import { EntityManager } from 'typeorm';

interface QueueServiceInterface {
  enter(model: QueueRequestModel, manager:EntityManager): Promise<QueueResponseCommand>
  myPosition(model: QueueRequestModel, manager:EntityManager):Promise<QueueResponseCommand>
  expire(model: QueueRequestModel, manager:EntityManager): Promise<QueueResponseCommand>
  myQueueInfo(model: QueueRequestModel, manager:EntityManager): Promise<QueueResponseCommand>
}

@Injectable()
export abstract class AbstractQueueService implements QueueServiceInterface {
  abstract enter(model: QueueRequestModel, manager:EntityManager): Promise<QueueResponseCommand>
  abstract myPosition(model: QueueRequestModel, manager:EntityManager):Promise<QueueResponseCommand>
  abstract expire(model: QueueRequestModel, manager:EntityManager): Promise<QueueResponseCommand>
  abstract myQueueInfo(model: QueueRequestModel, manager:EntityManager): Promise<QueueResponseCommand>
}