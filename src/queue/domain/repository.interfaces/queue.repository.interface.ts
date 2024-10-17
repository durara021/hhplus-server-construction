import { Injectable } from "@nestjs/common";
import { QueueEntity } from "../entities/queue.entity";


interface QueueRepositoryInterface{
    enter(queueEntity: QueueEntity): Promise<{position:number, status: string}>;
    myPosition(queueEntity: QueueEntity): Promise<{position:number, status: string}>;
}

@Injectable()
export abstract class AbstractQueueRepository implements QueueRepositoryInterface{
    abstract enter(queueEntity: QueueEntity): Promise<{position:number, status: string}>;
    abstract myPosition(queueEntity: QueueEntity): Promise<{position:number, status: string}>;
}