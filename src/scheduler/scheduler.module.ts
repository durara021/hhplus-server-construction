// scheduler/scheduler.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.use-case';
import { QueueSchedulerRepository } from './queue.scheduler.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueEntity } from '../queue/domain/entities';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([QueueEntity]),
  ],
  providers: [ SchedulerService, QueueSchedulerRepository ],
})
export class SchedulerModule {}
