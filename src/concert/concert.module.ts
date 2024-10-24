import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { ConcertService } from './domain/concert.service';
import { AbstractConcertService } from './domain/service.interfaces';
import { ConcertController } from './pres/concert.controller';
import { AbstractConcertPlanRepository, AbstractConcertRepository } from './domain/repository.interfaces';
import { ConcertRepository } from './infra/repositories/concert.repository';
import { ConcertPlanRepository } from './infra/repositories/concertPlan.repository';
import { ConcertEntity, ConcertPlanEntity } from './infra/entities';
import { ConcertUsecase } from './app/concert.use-case';
import { ReservationModule } from '../reservation/reservation.module';

@Module({
  imports: [ TypeOrmModule.forFeature([ ConcertEntity, ConcertPlanEntity ]), forwardRef(() => ReservationModule), CommonModule ],
  controllers: [ConcertController],
  providers: [
    ConcertUsecase, 
    { provide: AbstractConcertRepository, useClass: ConcertRepository },
    { provide: AbstractConcertPlanRepository, useClass: ConcertPlanRepository },
    { provide: AbstractConcertService, useClass: ConcertService },
  ],
  exports: [AbstractConcertService],
})
export class ConcertModule {}
