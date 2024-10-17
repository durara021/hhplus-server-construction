import { Injectable } from '@nestjs/common';
import { EventLogRepository } from './event-log.repository';

@Injectable()
export class EventLogService {
  constructor(private readonly eventLogRepository: EventLogRepository) {}

  async markAsProcessed(itemId: number) {
    await this.eventLogRepository.updateStatus(itemId, 'processed');
  }

  async markAsFailed(itemId: number) {
    await this.eventLogRepository.updateStatus(itemId, 'failed');
  }
}
