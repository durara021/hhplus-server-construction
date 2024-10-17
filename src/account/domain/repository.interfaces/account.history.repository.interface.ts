import { Injectable } from "@nestjs/common";
import { AccountHistoryEntity } from "../entities";

interface AccountRepositoryHistoryInterface{
    record(accountHistoryEntity: AccountHistoryEntity): Promise<AccountHistoryEntity>;
    history(accountHistoryEntity: AccountHistoryEntity): Promise<AccountHistoryEntity[]>;
}

@Injectable()
export abstract class AbstractAccountHistoryRepository implements AccountRepositoryHistoryInterface{
    abstract record(accountHistoryEntity: AccountHistoryEntity): Promise<AccountHistoryEntity>;
    abstract history(accountHistoryEntity: AccountHistoryEntity): Promise<AccountHistoryEntity[]>;
}