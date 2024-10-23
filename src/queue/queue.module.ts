// queue.module.ts
import { Module } from '@nestjs/common';
import { QueueController } from './pres/queue.controller';
import { QueueService } from './domain/queue.service';
import { AbstractQueueService } from './domain/service.interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueEntity } from './infra/repositories/entities';
import { AbstractQueueRepository } from './domain/repository.interfaces';
import { QueueRepository } from './infra/repositories/queue.repository';
import { QueueUsecase } from './app/queue.use-case';

@Module({
  imports: [ TypeOrmModule.forFeature([QueueEntity]) ],
  controllers: [QueueController],
  providers: [
    QueueUsecase,
    { provide: AbstractQueueService, useClass: QueueService },
    { provide: AbstractQueueRepository, useClass: QueueRepository},
  ],
})
export class QueueModule {}
