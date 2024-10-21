import { Injectable } from '@nestjs/common';
import { AccountGetResponseDto as ResGetDto, AccountPostResponseDto as ResPostDto } from "../pres/dto";
import { AbstractAccountService } from '../domain/service.interfaces/account.service.interface';
import { AccountHistoryEntity } from '../domain/entities';
import { DataSource } from 'typeorm';

@Injectable()
export class AccountUsecase {

    constructor(
        private readonly accountService: AbstractAccountService,
        private readonly dataSource: DataSource,
    ){}

    //포인트 충전
    async charge(userId: number, amount: number): Promise<ResPostDto> {
        return await this.dataSource.transaction(async () => {
            const point = (await this.accountService.point(userId)).balance;
            const balance = await this.accountService.charge(point, amount);
            this.accountService.update(userId, balance);
            
            const recordResult = await this.accountService.record(userId, amount, 'charge');
            return new ResPostDto(recordResult.userId, recordResult.amount, recordResult.stat, recordResult.regDate);
        });
    }

    //포인트 조회
    async point(userId: number): Promise<ResGetDto> {
        return await this.dataSource.transaction(async () => {
            const point = await this.accountService.point(userId);

            return new ResGetDto(point.userId, point.balance);
        });
    }
}
