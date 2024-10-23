import { Injectable } from "@nestjs/common";
import { QueueSchedulerEntity } from "../entities";
import { QueueEntity } from "src/queue/infra/repositories/entities";

interface QueueSchedulerRepositoryInterface{
    pendingUsers(queueSchedulerEntity: QueueSchedulerEntity): Promise<QueueEntity[]>
    updateStatus(queueSchedulerEntity: QueueSchedulerEntity): Promise<number>
}

@Injectable()
export abstract class AbstractQueueSchedulerRepository implements QueueSchedulerRepositoryInterface{
    abstract pendingUsers(queueSchedulerEntity: QueueSchedulerEntity): Promise<QueueEntity[]>
    abstract updateStatus(queueSchedulerEntity: QueueSchedulerEntity): Promise<number>
}
