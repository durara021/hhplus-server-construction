import { Injectable, OnModuleInit } from '@nestjs/common';
import { CustomEventEmitterService } from './custom-event-emitter.service';
import { EventLogRepository } from './event-log.repository';

@Injectable()
export class EventRecoveryService implements OnModuleInit {
  constructor(
    private readonly eventEmitter: CustomEventEmitterService,
    private readonly eventLogRepository: EventLogRepository
  ) {}

  async onModuleInit() {
    const pendingEvents = await this.eventLogRepository.findPendingEvents();
    pendingEvents.forEach(event => {
      this.eventEmitter.publish(event.eventType, event.payload);
      this.eventLogRepository.updateStatus(event.id, 'processed');
    });
  }
}
