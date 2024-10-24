import { Injectable } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { AccountEntity } from "../entities/account.entity";
import { AbstractAccountRepository } from "../../domain/repository.interfaces";
import { AccountResponseModel } from "../../../account/domain/models";
import { ObjectMapper } from "../../../common/mapper/object-mapper";

@Injectable()
export class AccountRepository implements AbstractAccountRepository {
  
  constructor(
    private readonly objectMapper: ObjectMapper,
  ) {}

  async update(accountEntity: AccountEntity, manager: EntityManager): Promise<AccountResponseModel> {
    await manager.update(AccountEntity,
      {userId: accountEntity.userId},
      {balance: accountEntity.balance}
    );

    return this.objectMapper.mapObject((await manager.findOne(AccountEntity, {where: {userId: accountEntity.userId}})), AccountResponseModel);
  }

  async point(accountEntity:AccountEntity, manager: EntityManager): Promise<AccountResponseModel> {
    return this.objectMapper.mapObject((await manager.findOne(AccountEntity, {where : {userId: accountEntity.userId}})), AccountResponseModel);
  }
}
