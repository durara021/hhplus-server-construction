import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import { AccountEntity } from "../../domain/entities/account.entity";
import { AbstractAccountRepository } from "../../domain/repository.interfaces";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class AccountRepository implements AbstractAccountRepository {
  
  private autoManagerRepository: AutoManagerRepository<AccountEntity>;

  constructor(
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async charge(accountEntity: AccountEntity): Promise<AccountEntity> {
    await this.autoManagerRepository.proxyInstance.update({userId: accountEntity.userId}, { balance: () => `balance + ${accountEntity.balance}`});

    return await this.autoManagerRepository.proxyInstance.findOne({where: {userId: accountEntity.userId}});
  }

  async point(accountEntity:AccountEntity): Promise<AccountEntity> {
    return await this.autoManagerRepository.proxyInstance.findOne({where : {userId: accountEntity.userId}});
  }
  
  async use(accountEntity: AccountEntity): Promise<AccountEntity> {
    await this.autoManagerRepository.proxyInstance.createQueryBuilder()
      .update('AccountEntity') 
      .set({ balance: accountEntity.balance }) 
      .where('userId = :userId', { userId: accountEntity.userId })
      .execute();

    return await this.autoManagerRepository.proxyInstance.findOne({where: {userId: accountEntity.userId}});
  }

}
