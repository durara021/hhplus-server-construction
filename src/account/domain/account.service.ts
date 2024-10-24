import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { AccountEntity, AccountHistoryEntity } from '../infra/entities';
import { AbstractAccountRepository, AbstractAccountHistoryRepository } from './repository.interfaces';
import { AbstractAccountService } from './service.interfaces/account.service.interface';
import { AccountRequestModel } from './models';
import { ObjectMapper } from '../../common/mapper/object-mapper';
import { AccountResponseCommand } from '../app/commands/account.response.command';

@Injectable()
export class AccountService implements AbstractAccountService{

  constructor(
    private readonly accountRepository: AbstractAccountRepository,
    private readonly accountHistoryRepository: AbstractAccountHistoryRepository,
    private readonly objectMapper: ObjectMapper,
  ) {}
  
  //포인트 조회
  async point(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand> {
    return this.objectMapper.mapObject((await this.accountRepository.point(this.objectMapper.mapObject(accountModel, AccountEntity), manager)), AccountResponseCommand);
  }

  //포인트 사용
  async use(accountModel: AccountRequestModel): Promise<AccountResponseCommand> {
    const balance = accountModel.balance - accountModel.amount;
    if(balance < 0) throw new Error("사용 가능한 포인트가 부족합니다.");
    accountModel.updateBalance(balance);
    
    return this.objectMapper.mapObject(accountModel, AccountResponseCommand);
  }

  //포인트 사용
  async charge(accountModel: AccountRequestModel): Promise<AccountResponseCommand> {
    const balance = accountModel.balance + accountModel.amount;
    accountModel.updateBalance(balance);
    
    return this.objectMapper.mapObject(accountModel, AccountResponseCommand);
  }
  
  //금액 업데이트
  async update(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand> {
    return this.objectMapper.mapObject((await this.accountRepository.update(this.objectMapper.mapObject(accountModel, AccountEntity), manager)), AccountResponseCommand);
  }
  
  //금액 이력 추가
  async record(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand>{
    return this.objectMapper.mapObject((await this.accountHistoryRepository.record(this.objectMapper.mapObject(accountModel, AccountHistoryEntity), manager)), AccountResponseCommand);
  }

  // 이력 및 현재 금액 조회
  async history(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand[]> {
    return this.objectMapper.mapArray((await this.accountHistoryRepository.history(this.objectMapper.mapObject(accountModel, AccountHistoryEntity), manager)), AccountResponseCommand);

  }

}
