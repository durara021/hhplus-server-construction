import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';

@Injectable()
export class CustomEventEmitterService extends EventEmitter {
  constructor() {
    super();
  }

  publish(event: string, payload: any): void {
    this.emit(event, payload);
  }
}
