import { Injectable } from "@nestjs/common";
import { AccountHistoryEntity } from "../../infra/entities";
import { AccountResponseModel } from "../models";
import { EntityManager } from "typeorm";

interface AccountRepositoryHistoryInterface{
    record(accountHistoryEntity: AccountHistoryEntity, manager: EntityManager): Promise<AccountResponseModel>;
    history(accountHistoryEntity: AccountHistoryEntity, manager: EntityManager): Promise<AccountResponseModel[]>;
}

@Injectable()
export abstract class AbstractAccountHistoryRepository implements AccountRepositoryHistoryInterface{
    abstract record(accountHistoryEntity: AccountHistoryEntity, manager: EntityManager): Promise<AccountResponseModel>;
    abstract history(accountHistoryEntity: AccountHistoryEntity, manager: EntityManager): Promise<AccountResponseModel[]>;
}