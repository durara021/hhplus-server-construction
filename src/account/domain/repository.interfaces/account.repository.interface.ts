import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../entities";

interface AccountRepositoryInterface{
    update(accountEntity: AccountEntity): Promise<AccountEntity>
    point(accountEntity: AccountEntity): Promise<AccountEntity>
}

@Injectable()
export abstract class AbstractAccountRepository implements AccountRepositoryInterface{
    abstract update(accountEntity: AccountEntity): Promise<AccountEntity>
    abstract point(accountEntity: AccountEntity): Promise<AccountEntity>
}