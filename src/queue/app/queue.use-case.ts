import { Injectable } from '@nestjs/common';
import { QueuePostResponseDto as ResPostDto, QueueGetResponseDto as ResGetDto } from "../pres/dto";
import { AbstractQueueService } from '../domain/service.interfaces';
import { DataSource } from 'typeorm';

@Injectable()
export class QueueUsecase {

    constructor(
        private readonly queueService: AbstractQueueService,
        private readonly dataSource: DataSource
    ){}

    async enter(userId: number, uuid: string): Promise<ResPostDto> {
        return await this.dataSource.transaction(async () => {
            const enterResult = await this.queueService.enter(userId, uuid);
            const myPosition = await this.queueService.myPosition(enterResult.id);

            return new ResPostDto(myPosition, enterResult.status);
        });
    }

    async myPosition(userId: number): Promise<ResGetDto> {
        return await this.dataSource.transaction(async () => {
            const myQueueInfo = await this.queueService.myQueueInfo(userId);
            const myPosition = await this.queueService.myPosition(myQueueInfo.id);

            return new ResGetDto(myPosition, myQueueInfo.status);
        });
    }
}
