import { Injectable } from '@nestjs/common';
import { AccountEntity, AccountHistoryEntity } from '../domain/entities';
import { AbstractAccountRepository, AbstractAccountHistoryRepository } from '../domain/repository.interfaces';
import { AbstractAccountService } from '../domain/service.interfaces/account.service.interface';

@Injectable()
export class AccountService implements AbstractAccountService{

  constructor(
    private readonly accountRepository: AbstractAccountRepository,
    private readonly accountHistoryRepository: AbstractAccountHistoryRepository,
  ) {}

  //금액 충전
  async charge(userId: number, amount:number): Promise<AccountEntity> {

    const accountEntity = new AccountEntity();
    accountEntity.userId = this.isValidNum(userId, 'userId');
    accountEntity.balance = this.isValidNum(amount, 'amount');

    return await this.accountRepository.charge(accountEntity);
  }

  //포인트 조회
  async point(userId:number): Promise<AccountEntity> {

    const accountEntity: AccountEntity = new AccountEntity();
    accountEntity.userId = this.isValidNum(userId, 'userId');

    return await this.accountRepository.point(accountEntity);
  }

  //포인트 사용
  async use(userId:number, balance: number): Promise<AccountEntity> {

    const accountEntity: AccountEntity = new AccountEntity();
    accountEntity.userId = this.isValidNum(userId, 'userId');
    accountEntity.balance = this.isValidNum(balance, 'balance');

    return await this.accountRepository.use(accountEntity);
  }

  //금액 이력 추가
  async record(userId:number, amount:number, stat: string): Promise<AccountHistoryEntity>{

    const accountHistoryEntity = new AccountHistoryEntity();
    accountHistoryEntity.userId = this.isValidNum(userId, 'userId');
    accountHistoryEntity.amount = this.isValidNum(amount, 'amount');
    accountHistoryEntity.stat = stat;
    
    return await this.accountHistoryRepository.record(accountHistoryEntity);
  }

  // 이력 및 현재 금액 조회
  async history(userId: number): Promise<AccountHistoryEntity[]> {
    const accountHistoryEntity: AccountHistoryEntity = new AccountHistoryEntity();
    accountHistoryEntity.userId = this.isValidNum(userId, 'userId');

    return await this.accountHistoryRepository.history(accountHistoryEntity);

  }

  // 사용 가능한 숫자인지 확인(양의 정수)
	private isValidNum(num: any, gubun: string): number{
		if(Number.isInteger(num) && num > 0) return num;
		throw new Error(`${num}는 입력할 수 없는 ${gubun}형식입니다.`);
	}

}
