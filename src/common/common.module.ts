import { Module } from '@nestjs/common';
import { CustomLogger } from './logger/custom.logger';
import { ObjectMapper } from './mapper/object-mapper';

@Module({
  providers: [
    CustomLogger, 
    ObjectMapper,
  ],
  exports: [
    CustomLogger, 
    ObjectMapper,
  ]
})
export class CommonModule {}
