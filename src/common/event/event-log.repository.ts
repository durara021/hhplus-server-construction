import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EventLogEntity } from './event-log.entity';

@Injectable()
export class EventLogRepository {
  constructor(private readonly repository: Repository<EventLogEntity>) {}

  async save(eventLog: Partial<EventLogEntity>): Promise<EventLogEntity> {
    return this.repository.save(eventLog);
  }

  async findPendingEvents(): Promise<EventLogEntity[]> {
    return this.repository.find({ where: { status: 'pending' } });
  }

  async updateStatus(id: number, status: string): Promise<void> {
    await this.repository.update(id, { status, processedAt: new Date() });
  }
}
