import { UserService } from '../user/app/user.service';
import { AbstractUserRepository } from '../user/domain/repository.interfaces';

describe('UserService 단위테스트', () => {
  let userService: UserService;
  let mockUserRepository: AbstractUserRepository;

  beforeEach(() => {
    mockUserRepository = {} as any;
    userService = new UserService(mockUserRepository);
  });


  describe('userId 유효성 검사', () => {
    const ids = [null, -30, 40.5];
    ids.forEach(id =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(userService.userExists(id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
    });
  })

});
