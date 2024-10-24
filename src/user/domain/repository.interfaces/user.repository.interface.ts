import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../infra/entity.interfaces/user.entity";
import { EntityManager } from "typeorm";

interface UserRepositoryInterface{
    user(userEntity: UserEntity, manager: EntityManager): Promise<UserEntity>;
}

@Injectable()
export abstract class AbstractUserRepository implements UserRepositoryInterface{
    abstract user(userEntity: UserEntity, manager: EntityManager): Promise<UserEntity>;
}