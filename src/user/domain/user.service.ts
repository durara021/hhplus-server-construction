import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../infra/entity.interfaces';
import { AbstractUserRepository } from './repository.interfaces';
import { NotFoundError } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: AbstractUserRepository,
  ) {}

  //유저 확인
  async user(userId: number): Promise<UserEntity> {

    const userEntity = new UserEntity();
    userEntity.id = userId;
    const user = this.userRepository.user(userEntity);
    
    if(!user) throw new NotFoundException("유저를 찾을 수 없습니다.");
    return user;
  }

}