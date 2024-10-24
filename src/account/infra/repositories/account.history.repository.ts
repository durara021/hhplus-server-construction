import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AbstractAccountHistoryRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectMapper } from "../../../common/mapper/object-mapper";
import { AccountHistoryEntity } from "../entities";
import { AccountResponseModel } from "../../../account/domain/models";

@Injectable()

export class AccountHistoryRepository implements AbstractAccountHistoryRepository {

  constructor(
    @InjectRepository(AccountHistoryEntity)
    private readonly objectMapper: ObjectMapper,
  ) {}

  async record(accoutHistoryEntity: AccountHistoryEntity, manager: EntityManager): Promise<AccountResponseModel> {
    return this.objectMapper.mapObject((await manager.save(accoutHistoryEntity)), AccountResponseModel);
  }

  async history(accoutHistoryEntity: AccountHistoryEntity, manager: EntityManager): Promise<AccountResponseModel[]> {
    return this.objectMapper.mapArray((await manager.find(AccountHistoryEntity, {where: {userId: accoutHistoryEntity.userId}})), AccountResponseModel);
  }
}
