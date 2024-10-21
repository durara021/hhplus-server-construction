import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AbstractAccountHistoryRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";
import { AccountHistoryEntity } from "../../domain/entities";

@Injectable()

export class AccountHistoryRepository implements AbstractAccountHistoryRepository {

  private autoManagerRepository: AutoManagerRepository<AccountHistoryEntity>;

  constructor(
    @InjectRepository(AccountHistoryEntity)
    private readonly repository: Repository<AccountHistoryEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async record(accoutHistoryEntity: AccountHistoryEntity): Promise<AccountHistoryEntity> {
    return await this.autoManagerRepository.proxyInstance.save(accoutHistoryEntity);
  }

  async history(accoutHistoryEntity: AccountHistoryEntity): Promise<AccountHistoryEntity[]> {
    return await this.autoManagerRepository.proxyInstance.find({where: {userId: accoutHistoryEntity.userId}});
  }
}
