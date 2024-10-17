// scheduler/scheduler.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.service';
import { QueueSchedulerRepository } from './queue.scheduler.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueEntity } from '../queue/domain/entities';
import { ConcertTicketSchedulerRepository } from './concertTicket.scheduler.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([QueueEntity]),
  ],
  providers: [SchedulerService, QueueSchedulerRepository, ConcertTicketSchedulerRepository ],
})
export class SchedulerModule {}
