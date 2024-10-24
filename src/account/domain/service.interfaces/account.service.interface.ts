import { Injectable } from '@nestjs/common';
import { AccountRequestModel } from '../models';
import { AccountResponseCommand } from '../../app/commands/account.response.command';
import { EntityManager } from 'typeorm';

interface AccountServiceInterface {
  update(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand>
  use(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  charge(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  point(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand> 
  record(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand>
  history(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand[]> 
}

@Injectable()
export abstract class AbstractAccountService implements AccountServiceInterface {
  abstract update(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand>
  abstract use(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  abstract charge(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  abstract point(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand> 
  abstract record(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand>
  abstract history(accountModel: AccountRequestModel, manager: EntityManager): Promise<AccountResponseCommand[]> 
}