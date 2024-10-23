import { EntityManager, Repository } from "typeorm";
import { UserEntity } from "../entity.interfaces/user.entity";
import { Injectable } from "@nestjs/common";
import { AbstractUserRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class UserRepository implements AbstractUserRepository {
  
  private autoManagerRepository: AutoManagerRepository<UserEntity>;

  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async user(userEntity:UserEntity): Promise<UserEntity> {
    return await this.autoManagerRepository.proxyInstance.findOne({where: {id:userEntity.id}});
  }
  
}
