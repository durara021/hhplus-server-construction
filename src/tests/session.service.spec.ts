import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { SessionService } from '../session/domain/session.service';
import { AbstractSessionRepository } from '../session/domain/repository.interfaces';

describe('SessionService - create', () => {
  let sessionService: SessionService;
  let sessionRepository: AbstractSessionRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: AbstractSessionRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    sessionService = module.get<SessionService>(SessionService);
    sessionRepository = module.get<AbstractSessionRepository>(AbstractSessionRepository);
  });

  it('등록하려는 uuid가 이미 존재하는 uuid일 경우', async () => {
    const userId = 1;

    // sessionRepository.create가 null을 반환하도록 모킹 (중복된 UUID 시나리오)
    jest.spyOn(sessionRepository, 'create').mockResolvedValueOnce(null);

    // ConflictException이 발생하는지 확인
    await expect(sessionService.create(userId)).rejects.toThrow(ConflictException);
    await expect(sessionService.create(userId)).rejects.toThrow('UUID가 중복되어 세션을 생성할 수 없습니다.');
  });
});
