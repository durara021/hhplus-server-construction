import { Test, TestingModule } from '@nestjs/testing';
import { SessionUsecase } from '../session/app/session.use-case';
import { SessionService } from '../session/domain/session.service';
import { AbstractUserService } from '../user/domain/service.interfaces/user.service.interface';
import { SessionPostResponseDto as ResPostDto } from '../session/pres/dto';

describe('SessionUsecase', () => {
  let sessionUsecase: SessionUsecase;
  let sessionService: SessionService;
  let userService: AbstractUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionUsecase,
        {
          provide: SessionService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: AbstractUserService,
          useValue: {
            user: jest.fn(),
          },
        },
      ],
    }).compile();

    sessionUsecase = module.get<SessionUsecase>(SessionUsecase);
    sessionService = module.get<SessionService>(SessionService);
    userService = module.get<AbstractUserService>(AbstractUserService);
  });

  it('세션을 생성하고 ResPostDto를 반환해야 한다', async () => {
    const userId = 1;
    const user = { id: userId, name: 'Test User' };
    const session = { uuid: 'test-uuid', userId, regDate: new Date() };

    // Mocking service responses
    (userService.user as jest.Mock).mockResolvedValue(user);
    (sessionService.create as jest.Mock).mockResolvedValue(session);

    const result = await sessionUsecase.create(userId);

    expect(userService.user).toHaveBeenCalledWith(userId);
    expect(sessionService.create).toHaveBeenCalledWith(user.id);

    // Validate the result
    expect(result).toBeInstanceOf(ResPostDto);
    expect(result.uuid).toBe(session.uuid);
    expect(result.userId).toBe(session.userId);
    expect(result.regDate).toEqual(new Date(session.regDate));
  });

  it('사용자가 존재하지 않을 경우 오류를 발생시켜야 한다', async () => {
    const userId = 1;

    // Mocking userService to throw an error
    (userService.user as jest.Mock).mockRejectedValue(new Error('User not found'));

    await expect(sessionUsecase.create(userId)).rejects.toThrow('User not found');
  });
});
