import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AccountGetResponseDto as ResGetDto, AccountPostResponseDto as ResPostDto } from "../pres/dto";
import { AbstractAccountService } from '../domain/service.interfaces/account.service.interface';
import { AccountCommand } from './commands/account.request.command';
import { AccountRequestModel } from '../domain/models';
import { ObjectMapper } from '../../common/mapper/object-mapper';

@Injectable()
export class AccountUsecase {
  constructor(
    private readonly accountService: AbstractAccountService,
    private readonly dataSource: DataSource,
    private readonly objectMapper: ObjectMapper,
  ) {}

  // 포인트 충전
  async charge(accountCommand: AccountCommand): Promise<ResPostDto> {
    return await this.dataSource.transaction(async () => {

      const accountRequestModel = this.objectMapper.mapObject(accountCommand, AccountRequestModel);

      // 현재 잔액 조회
      const currentAccount = await this.accountService.point(accountRequestModel);

      // 포인트 충전 및 모델 업데이트
      const chargeAccountModel = this.objectMapper.mapObject(currentAccount, AccountRequestModel);
      chargeAccountModel.updateAmount(accountCommand.amount);

      const chargeAccount = await this.accountService.charge(chargeAccountModel);

      // 업데이트된 잔액 저장
      await this.accountService.update(this.objectMapper.mapObject(chargeAccount, AccountRequestModel));

      // 거래 기록 추가
      accountRequestModel.updateStatus('charge');
      const recordResult = await this.accountService.record(accountRequestModel);

      // 모델을 DTO로 변환하여 반환
      return this.objectMapper.mapObject(recordResult, ResPostDto);
    });
  }

  // 포인트 조회
  async point(accountCommand: AccountCommand): Promise<ResGetDto> {
    return await this.dataSource.transaction(async () => {
      // Command를 Model로 변환
      const point = await this.accountService.point(this.objectMapper.mapObject(accountCommand, AccountRequestModel));

      // 모델을 DTO로 변환하여 반환
      return this.objectMapper.mapObject(point, ResGetDto);
    });
  }
}
