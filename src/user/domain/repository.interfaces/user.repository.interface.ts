import { Injectable } from "@nestjs/common";
import { UserEntity } from "../../infra/entity.interfaces/user.entity";

interface UserRepositoryInterface{
    user(userEntity: UserEntity): Promise<UserEntity>;
}

@Injectable()
export abstract class AbstractUserRepository implements UserRepositoryInterface{
    abstract user(userEntity: UserEntity): Promise<UserEntity>;
}