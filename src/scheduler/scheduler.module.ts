// scheduler/scheduler.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerUsecase } from './app/scheduler.use-case';
import { QueueSchedulerRepository } from './infra/repositories/queue.scheduler.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueEntity } from '../queue/infra/entities';
import { SchedulerService } from './domain/scheduler.service';
import { AbstractQueueSchedulerRepository, AbstractReservationSchedulerRepository } from './domain/repository.interfaces';
import { ReservationSchedulerRepository } from './infra/repositories/reservation.scheduler.repository';
import { CommonModule } from '../common/common.module';
import { ReservationEntity } from '../reservation/infra/entities';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([QueueEntity, ReservationEntity]),
    , CommonModule
  ],
  providers: [ SchedulerUsecase, SchedulerService,
    { provide: AbstractQueueSchedulerRepository, useClass: QueueSchedulerRepository },
    { provide: AbstractReservationSchedulerRepository, useClass: ReservationSchedulerRepository },
  ],
})
export class SchedulerModule {}
