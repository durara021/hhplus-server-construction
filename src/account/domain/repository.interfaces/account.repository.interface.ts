import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../entities";

interface AccountRepositoryInterface{
    charge(accountEntity: AccountEntity): Promise<AccountEntity>
    point(accountEntity: AccountEntity): Promise<AccountEntity>
    use(accountEntity: AccountEntity): Promise<AccountEntity>
}

@Injectable()
export abstract class AbstractAccountRepository implements AccountRepositoryInterface{
    abstract charge(accountEntity: AccountEntity): Promise<AccountEntity>
    abstract point(accountEntity: AccountEntity): Promise<AccountEntity>
    abstract use(accountEntity: AccountEntity): Promise<AccountEntity>
}