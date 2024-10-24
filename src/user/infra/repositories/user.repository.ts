import { EntityManager } from "typeorm";
import { UserEntity } from "../entity.interfaces/user.entity";
import { Injectable } from "@nestjs/common";
import { AbstractUserRepository } from "../../domain/repository.interfaces";

@Injectable()
export class UserRepository implements AbstractUserRepository {
  
  async user(userEntity:UserEntity, manager: EntityManager): Promise<UserEntity> {
    return await manager.findOne(UserEntity, {where: {id:userEntity.id}});
  }
  
}
