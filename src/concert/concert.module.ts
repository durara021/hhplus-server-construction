import { Module } from '@nestjs/common';
import { ConcertService } from './domain/concert.service';
import { AbstractConcertService } from './domain/service.interfaces';
import { ConcertController } from './pres/concert.controller';
import { AbstractConcertPlanRepository, AbstractConcertRepository, AbstractConcertTicketRepository } from './domain/repository.interfaces';
import { ConcertRepository } from './infra/repositories/concert.repository';
import { ConcertPlanRepository } from './infra/repositories/concertPlan.repository';
import { ConcertTicketRepository } from './infra/repositories/concertTiclet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConcertEntity, ConcertPlanEntity, ConcertTicketEntity } from './domain/entities';
import { ConcertUsecase } from './app/concert.use-case';

@Module({
  imports: [ TypeOrmModule.forFeature([ConcertEntity, ConcertPlanEntity, ConcertTicketEntity])],
  controllers: [ConcertController],
  providers: [
    ConcertUsecase, 
    { provide: AbstractConcertRepository, useClass: ConcertRepository },
    { provide: AbstractConcertPlanRepository, useClass: ConcertPlanRepository },
    { provide: AbstractConcertTicketRepository, useClass: ConcertTicketRepository },
    { provide: AbstractConcertService, useClass: ConcertService },
  ],
  exports: [AbstractConcertService],
})
export class ConcertModule {}
