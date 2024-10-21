import { Injectable } from "@nestjs/common";
import { QueueEntity } from "../entities/queue.entity";


interface QueueRepositoryInterface{
    enter(queueEntity: QueueEntity): Promise<QueueEntity>
    lastActiveUser(): Promise<QueueEntity>
    expire(queueEntity: QueueEntity): Promise<QueueEntity>
    myQueueInfo(queueEntity: QueueEntity): Promise<QueueEntity>
}

@Injectable()
export abstract class AbstractQueueRepository implements QueueRepositoryInterface{
    abstract enter(queueEntity: QueueEntity): Promise<QueueEntity>
    abstract lastActiveUser(): Promise<QueueEntity>
    abstract expire(queueEntity: QueueEntity): Promise<QueueEntity>
    abstract myQueueInfo(queueEntity: QueueEntity): Promise<QueueEntity>
}