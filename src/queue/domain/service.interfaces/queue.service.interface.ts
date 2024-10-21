import { Injectable } from '@nestjs/common';
import { QueueEntity } from '../entities';

interface QueueServiceInterface {
  enter(userId:number, uuid:string): Promise<QueueEntity>
  myPosition(queueId: number):Promise<number>
  expire(userId: number): Promise<QueueEntity>
  myQueueInfo(userId: number): Promise<QueueEntity>
}

@Injectable()
export abstract class AbstractQueueService implements QueueServiceInterface {
  abstract enter(userId:number, uuid:string): Promise<QueueEntity>
  abstract myPosition(queueId: number):Promise<number>
  abstract expire(userId: number): Promise<QueueEntity>
  abstract myQueueInfo(userId: number): Promise<QueueEntity>
}