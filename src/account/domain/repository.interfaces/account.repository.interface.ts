import { Injectable } from "@nestjs/common";
import { AccountEntity } from "../../infra/entities";
import { AccountResponseModel } from "../models";

interface AccountRepositoryInterface{
    update(accountEntity: AccountEntity): Promise<AccountResponseModel>
    point(accountEntity: AccountEntity): Promise<AccountResponseModel>
}

@Injectable()
export abstract class AbstractAccountRepository implements AccountRepositoryInterface{
    abstract update(accountEntity: AccountEntity): Promise<AccountResponseModel>
    abstract point(accountEntity: AccountEntity): Promise<AccountResponseModel>
}