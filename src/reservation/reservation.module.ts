import { Module } from '@nestjs/common';
import { ReservationService } from './domain/reservation.service';
import { ReservationController } from './pres/reservation.controller';
import { ConcertModule } from '../concert/concert.module';
import { AbstractReservationService } from './domain/service.interfaces';
import { AbstractReservationRepository } from './domain/repository.interfaces';
import { ReservationRepository } from './infra/repositories/reservation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './domain/entities';
import { ReservationUsecase } from './app/reservation.use-case';

@Module({
  imports: [ TypeOrmModule.forFeature([ReservationEntity]), ConcertModule ],
  controllers: [ ReservationController ],
  providers: [
    ReservationUsecase,
    { provide: AbstractReservationRepository, useClass: ReservationRepository },
    { provide: AbstractReservationService, useClass: ReservationService }
  ],
  exports: [AbstractReservationService]
})
export class ReservationModule {}
