import { Injectable } from "@nestjs/common";
import { AccountHistoryEntity } from "../../infra/entities";
import { AccountResponseModel } from "../models";

interface AccountRepositoryHistoryInterface{
    record(accountHistoryEntity: AccountHistoryEntity): Promise<AccountResponseModel>;
    history(accountHistoryEntity: AccountHistoryEntity): Promise<AccountResponseModel[]>;
}

@Injectable()
export abstract class AbstractAccountHistoryRepository implements AccountRepositoryHistoryInterface{
    abstract record(accountHistoryEntity: AccountHistoryEntity): Promise<AccountResponseModel>;
    abstract history(accountHistoryEntity: AccountHistoryEntity): Promise<AccountResponseModel[]>;
}