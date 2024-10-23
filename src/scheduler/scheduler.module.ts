// scheduler/scheduler.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerUsecase } from './app/scheduler.use-case';
import { QueueSchedulerRepository } from './infra/queue.scheduler.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueEntity } from '../queue/infra/repositories/entities';
import { SchedulerService } from './domain/scheduler.service';
import { AbstractQueueSchedulerRepository, AbstractReservationSchedulerRepository } from './domain/repository.interfaces';
import { ReservationSchedulerRepository } from './infra/reservation.scheduler.repository';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([QueueEntity]),
  ],
  providers: [ SchedulerUsecase, SchedulerService,
    { provide: AbstractQueueSchedulerRepository, useClass: QueueSchedulerRepository },
    { provide: AbstractReservationSchedulerRepository, useClass: ReservationSchedulerRepository },
  ],
})
export class SchedulerModule {}
