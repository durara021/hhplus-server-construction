import { Injectable } from "@nestjs/common";
import { SessionEntity } from "../entitiy.interfaces/session.entity";

interface SessionRepositoryInterface{
    create(sessionEntity: SessionEntity): Promise<SessionEntity>;
    session(sessionEntity: SessionEntity): Promise<SessionEntity>;
}

@Injectable()
export abstract class AbstractSessionRepository implements SessionRepositoryInterface{
    abstract create(sessionEntity: SessionEntity): Promise<SessionEntity>;
    abstract session(sessionEntity: SessionEntity): Promise<SessionEntity>;
}