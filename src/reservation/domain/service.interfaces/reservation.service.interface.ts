import { Injectable } from '@nestjs/common';
import { ReservationResponseCommand } from '../../app/commands';
import { ReservationRequestModel } from '../models';
import { EntityManager } from 'typeorm';

interface ReservationServiceInterface {
  reserve(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand>
  statusUpdate(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand>
  statusesUpdate(model: ReservationRequestModel, manager: EntityManager): Promise<void>
  reservedItems(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand[]>
  isAvailableItem(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand>
  itemsByStatus(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand[]>
}

@Injectable()
export abstract class AbstractReservationService implements ReservationServiceInterface {
  abstract reserve(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand>
  abstract statusUpdate(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand>
  abstract statusesUpdate(model: ReservationRequestModel, manager: EntityManager): Promise<void>
  abstract reservedItems(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand[]>
  abstract isAvailableItem(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand>
  abstract itemsByStatus(model: ReservationRequestModel, manager: EntityManager): Promise<ReservationResponseCommand[]>
}
