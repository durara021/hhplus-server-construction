import { Injectable } from '@nestjs/common';
import { AccountEntity, AccountHistoryEntity } from './entities';
import { AbstractAccountRepository, AbstractAccountHistoryRepository } from './repository.interfaces';
import { AbstractAccountService } from './service.interfaces/account.service.interface';

@Injectable()
export class AccountService implements AbstractAccountService{

  constructor(
    private readonly accountRepository: AbstractAccountRepository,
    private readonly accountHistoryRepository: AbstractAccountHistoryRepository,
  ) {}

  //금액 업데이트
  async update(userId: number, balance:number): Promise<AccountEntity> {
    const accountEntity = new AccountEntity();
    accountEntity.userId = userId;
    accountEntity.balance = balance;

    return await this.accountRepository.update(accountEntity);
  }

  //포인트 조회
  async point(userId:number): Promise<AccountEntity> {
    const accountEntity: AccountEntity = new AccountEntity();
    accountEntity.userId = userId;

    return await this.accountRepository.point(accountEntity);
  }

  //포인트 사용
  async use(balance:number, point: number): Promise<number> {
    balance = balance - point;
    if(balance < 0) throw new Error("사용 가능한 포인트가 부족합니다.");
 
    return balance;
  }

  //포인트 사용
  async charge(balance:number, point: number): Promise<number> {
    return balance + point;
  }
  
  //금액 이력 추가
  async record(userId:number, amount:number, stat: string): Promise<AccountHistoryEntity>{

    const accountHistoryEntity = new AccountHistoryEntity();
    accountHistoryEntity.userId = userId;
    accountHistoryEntity.amount = amount;
    accountHistoryEntity.stat = stat;
    
    return await this.accountHistoryRepository.record(accountHistoryEntity);
  }

  // 이력 및 현재 금액 조회
  async history(userId: number): Promise<AccountHistoryEntity[]> {
    const accountHistoryEntity: AccountHistoryEntity = new AccountHistoryEntity();
    accountHistoryEntity.userId = userId;

    return await this.accountHistoryRepository.history(accountHistoryEntity);

  }

}
