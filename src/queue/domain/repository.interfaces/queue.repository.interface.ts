import { Injectable } from "@nestjs/common";
import { QueueEntity } from "../../infra/repositories/entities/queue.entity";
import { QueueResponseModel } from "../models";


interface QueueRepositoryInterface{
    enter(queueEntity: QueueEntity): Promise<QueueResponseModel>
    lastActiveUser(): Promise<QueueResponseModel>
    expire(queueEntity: QueueEntity): Promise<QueueResponseModel>
    myQueueInfo(queueEntity: QueueEntity): Promise<QueueResponseModel>
}

@Injectable()
export abstract class AbstractQueueRepository implements QueueRepositoryInterface{
    abstract enter(queueEntity: QueueEntity): Promise<QueueResponseModel>
    abstract lastActiveUser(): Promise<QueueResponseModel>
    abstract expire(queueEntity: QueueEntity): Promise<QueueResponseModel>
    abstract myQueueInfo(queueEntity: QueueEntity): Promise<QueueResponseModel>
}