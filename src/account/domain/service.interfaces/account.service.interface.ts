import { Injectable } from '@nestjs/common';
import { AccountEntity, AccountHistoryEntity } from '../entities';

interface AccountServiceInterface {
  update(userId: number, balance:number): Promise<AccountEntity>
  use(balance: number, point:number): Promise<number>
  charge(balance: number, point:number): Promise<number>
  point(userId:number): Promise<AccountEntity> 
  record(userId:number, amount:number, stat: string): Promise<AccountHistoryEntity>
  history(userId: number): Promise<AccountHistoryEntity[]> 
}

@Injectable()
export abstract class AbstractAccountService implements AccountServiceInterface {
  abstract update(userId: number, balance:number): Promise<AccountEntity>
  abstract use(balance: number, point:number): Promise<number>
  abstract charge(balance: number, point:number): Promise<number>
  abstract point(userId:number): Promise<AccountEntity> 
  abstract record(userId:number, amount:number, stat: string): Promise<AccountHistoryEntity>
  abstract history(userId: number): Promise<AccountHistoryEntity[]> 
}