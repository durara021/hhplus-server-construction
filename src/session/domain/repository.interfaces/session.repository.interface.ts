import { Injectable } from "@nestjs/common";
import { SessionEntity } from "../entities/session.entity";

interface SessionRepositoryInterface{
    create(sessionEntity: SessionEntity): Promise<SessionEntity>;
    session(sessionEntity: SessionEntity): Promise<SessionEntity>;
    expire(sessionEntity: SessionEntity): Promise<SessionEntity>;
}

@Injectable()
export abstract class AbstractSessionRepository implements SessionRepositoryInterface{
    abstract create(sessionEntity: SessionEntity): Promise<SessionEntity>
    abstract session(sessionEntity: SessionEntity): Promise<SessionEntity>
    abstract expire(sessionEntity: SessionEntity): Promise<SessionEntity>
}