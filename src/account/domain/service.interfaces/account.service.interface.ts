import { Injectable } from '@nestjs/common';
import { AccountRequestModel } from '../models';
import { AccountResponseCommand } from 'src/account/app/commands/account.response.command';

interface AccountServiceInterface {
  update(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  use(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  charge(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  point(accountModel: AccountRequestModel): Promise<AccountResponseCommand> 
  record(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  history(accountModel: AccountRequestModel): Promise<AccountResponseCommand[]> 
}

@Injectable()
export abstract class AbstractAccountService implements AccountServiceInterface {
  abstract update(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  abstract use(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  abstract charge(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  abstract point(accountModel: AccountRequestModel): Promise<AccountResponseCommand> 
  abstract record(accountModel: AccountRequestModel): Promise<AccountResponseCommand>
  abstract history(accountModel: AccountRequestModel): Promise<AccountResponseCommand[]> 
}