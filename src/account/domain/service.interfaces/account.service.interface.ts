import { Injectable } from '@nestjs/common';
import { AccountEntity, AccountHistoryEntity } from '../entities';

interface AccountServiceInterface {

  charge(userId: number, amount:number): Promise<AccountEntity>
  use(userId: number, balance: number): Promise<AccountEntity>
  point(userId:number): Promise<AccountEntity> 
  record(userId:number, amount:number, stat: string): Promise<AccountHistoryEntity>
  history(userId: number): Promise<AccountHistoryEntity[]> 

}

@Injectable()
export abstract class AbstractAccountService implements AccountServiceInterface {
  abstract charge(userId: number, amount: number): Promise<AccountEntity>
  abstract use(userId: number, balance: number): Promise<AccountEntity>
  abstract point(userId: number): Promise<AccountEntity>
  abstract record(userId:number, amount:number, stat: string): Promise<AccountHistoryEntity>
  abstract history(userId: number): Promise<AccountHistoryEntity[]>
}