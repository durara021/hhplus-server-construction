import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/domain/user.service';
import { AbstractUserRepository } from '../user/domain/repository.interfaces';
import { NotFoundException } from '@nestjs/common';

describe('UserService 단위테스트', () => {
  let userService: UserService;
  let userRepository: AbstractUserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: AbstractUserRepository,
          useValue: {
            user: jest.fn(), // user 메소드를 모킹
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<AbstractUserRepository>(AbstractUserRepository);
  });

  it('should throw NotFoundException if user is not found', async () => {
    const userId = 1;

    // userRepository.user가 null을 반환하도록 설정 (유저를 찾지 못한 시나리오)
    jest.spyOn(userRepository, 'user').mockResolvedValueOnce(null);

    // NotFoundException이 발생하는지 테스트
    await expect(userService.user(userId)).rejects.toThrow(NotFoundException);
    await expect(userService.user(userId)).rejects.toThrow('유저를 찾을 수 없습니다.');
  });

});
