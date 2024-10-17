import { Module } from '@nestjs/common';
import { CustomEventEmitterService } from './custom-event-emitter.service';
import { EventLogRepository } from './event-log.repository';
import { EventRecoveryService } from './event-recovery.service';

@Module({
  providers: [
    CustomEventEmitterService,
    EventLogRepository,
    EventRecoveryService,
  ],
  exports: [CustomEventEmitterService, EventLogRepository], // 다른 모듈에서도 사용할 수 있도록 내보내기
})
export class EventModule {}
