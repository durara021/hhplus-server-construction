import { Injectable } from '@nestjs/common';
import { SessionPostResponseDto as ResPostDto } from "../pres/dto";
import { SessionService } from './session.service';
import { DataSource } from 'typeorm';

@Injectable()
export class SessionUsecase {

    constructor(
        private readonly sessionService: SessionService,
        private readonly dataSource: DataSource
    ) {}

    //세션 생성
    async create(userId: number): Promise<ResPostDto> {
        return await this.dataSource.transaction(async () => {
            //세션 생성
            const uuid = this.sessionService.uuid();
            const createResult = await this.sessionService.create(uuid, userId);

            return createResult;
        });
    }

}
