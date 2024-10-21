import { Injectable } from '@nestjs/common';
import { SessionEntity } from '../entities';

interface SessionServiceInterface{
  create(userId: number): Promise<SessionEntity>
  session(uuid: string): Promise<SessionEntity>
  expire(uuid: string): Promise<SessionEntity>
}

@Injectable()
export abstract class AbstractSessionService{
    abstract create(userId: number): Promise<SessionEntity>
    abstract session(uuid: string): Promise<SessionEntity>
    abstract expire(uuid: string): Promise<SessionEntity>
}
