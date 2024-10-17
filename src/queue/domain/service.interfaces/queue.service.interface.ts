import { Injectable } from '@nestjs/common';

interface QueueServiceInterface {
  enter(userId:number, uuid:string): Promise<{position:number, status: string}>
  myPosition(userId: number):Promise<{position:number, status: string}>
}

@Injectable()
export abstract class AbstractQueueService implements QueueServiceInterface {
  abstract enter(userId:number, uuid:string): Promise<{position:number, status: string}>
  abstract myPosition(userId: number):Promise<{position:number, status: string}>
}