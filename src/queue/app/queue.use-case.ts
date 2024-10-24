import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { QueuePostResponseDto as ResPostDto, QueueGetResponseDto as ResGetDto } from "../pres/dto";
import { AbstractQueueService } from '../domain/service.interfaces';
import { QueueRequestCommand } from './commands';
import { QueueRequestModel } from '../domain/models';
import { ObjectMapper } from '../../common/mapper/object-mapper';

@Injectable()
export class QueueUsecase {

    constructor(
        private readonly queueService: AbstractQueueService,
        private readonly dataSource: DataSource,
        private readonly objectMapper: ObjectMapper,
    ) {}

    async enter(command: QueueRequestCommand): Promise<ResPostDto> {
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            const model = this.objectMapper.mapObject(command, QueueRequestModel);
            const enterResult = await this.queueService.enter(model, manager);
            const myPosition = await this.queueService.myPosition(this.objectMapper.mapObject(enterResult, QueueRequestModel), manager);

            return this.objectMapper.mapObject(myPosition, ResPostDto);
        });
    }

    async myPosition(command: QueueRequestCommand): Promise<ResGetDto> {
        return await this.dataSource.transaction(async (manager: EntityManager) => {
            const myQueueinfo = await this.queueService.myQueueInfo(this.objectMapper.mapObject(command, QueueRequestModel), manager);
            return this.objectMapper.mapObject((await this.queueService.myPosition(this.objectMapper.mapObject(myQueueinfo, QueueRequestModel), manager)), ResGetDto);
        });
    }
}
