import { Injectable } from '@nestjs/common';
import { ReservationResponseCommand } from '../../app/commands';
import { ReservationRequestModel } from '../models';

interface ReservationServiceInterface {
  reserve(model: ReservationRequestModel): Promise<ReservationResponseCommand>
  statusUpdate(model: ReservationRequestModel): Promise<ReservationResponseCommand>
  statusesUpdate(model: ReservationRequestModel): Promise<void>
  reservedItems(model: ReservationRequestModel): Promise<ReservationResponseCommand[]>
  isAvailableItem(model: ReservationRequestModel): Promise<ReservationResponseCommand>
  itemsByStatus(model: ReservationRequestModel): Promise<ReservationResponseCommand[]>
}

@Injectable()
export abstract class AbstractReservationService implements ReservationServiceInterface {
  abstract reserve(model: ReservationRequestModel): Promise<ReservationResponseCommand>
  abstract statusUpdate(model: ReservationRequestModel): Promise<ReservationResponseCommand>
  abstract statusesUpdate(model: ReservationRequestModel): Promise<void>
  abstract reservedItems(model: ReservationRequestModel): Promise<ReservationResponseCommand[]>
  abstract isAvailableItem(model: ReservationRequestModel): Promise<ReservationResponseCommand>
  abstract itemsByStatus(model: ReservationRequestModel): Promise<ReservationResponseCommand[]>
}
