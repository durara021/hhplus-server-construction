import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AccountEntity } from "../entities/account.entity";
import { AbstractAccountRepository } from "../../domain/repository.interfaces";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";
import { AccountResponseModel } from "src/account/domain/models";
import { ObjectMapper } from "src/common/mapper/object-mapper";

@Injectable()
export class AccountRepository implements AbstractAccountRepository {
  
  private autoManagerRepository: AutoManagerRepository<AccountEntity>;

  constructor(
    @InjectRepository(AccountEntity)
    private readonly objectMapper: ObjectMapper,
    private readonly repository: Repository<AccountEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async update(accountEntity: AccountEntity): Promise<AccountResponseModel> {
    await this.autoManagerRepository.proxyInstance.update(
      {userId: accountEntity.userId},
      {balance: accountEntity.balance}
    );

    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.findOne({where: {userId: accountEntity.userId}})), AccountResponseModel);
  }

  async point(accountEntity:AccountEntity): Promise<AccountResponseModel> {
    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.findOne({where : {userId: accountEntity.userId}})), AccountResponseModel);
  }
}
