import { Injectable } from "@nestjs/common";
import { QueueSchedulerEntity } from "../../infra/entities";
import { QueueEntity } from "../../../queue/infra/entities";
import { EntityManager } from "typeorm";

interface QueueSchedulerRepositoryInterface{
    pendingUsers(queueSchedulerEntity: QueueSchedulerEntity, manager: EntityManager): Promise<QueueEntity[]>
    updateStatus(queueSchedulerEntity: QueueSchedulerEntity, manager: EntityManager): Promise<number>
}

@Injectable()
export abstract class AbstractQueueSchedulerRepository implements QueueSchedulerRepositoryInterface{
    abstract pendingUsers(queueSchedulerEntity: QueueSchedulerEntity, manager: EntityManager): Promise<QueueEntity[]>
    abstract updateStatus(queueSchedulerEntity: QueueSchedulerEntity, manager: EntityManager): Promise<number>
}
