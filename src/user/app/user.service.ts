import { Injectable } from '@nestjs/common';
import { UserEntity } from '../domain/entity.interfaces';
import { AbstractUserRepository } from '../domain/repository.interfaces';

@Injectable()
export class UserService {

  constructor(
    private readonly userRepository: AbstractUserRepository,
  ) {}

  //유저 확인
  async userExists(userId: number): Promise<UserEntity> {

    const userEntity = new UserEntity();
    userEntity.id = this.isValidNum(userId, 'userId');

    return this.userRepository.user(userEntity);
  }

  // 사용 가능한 숫자인지 확인(양의 정수)
	private isValidNum(num: any, gubun: string): number {
		if(Number.isInteger(num) && num > 0) return num;
		throw new Error(`${num}는 입력할 수 없는 ${gubun}형식입니다.`);
	}

}