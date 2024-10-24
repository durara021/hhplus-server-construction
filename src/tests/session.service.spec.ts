import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { SessionService } from '../session/domain/session.service';
import { AbstractSessionRepository } from '../session/domain/repository.interfaces';
import { AbstractSessionService } from '../session/domain/service.interfaces/session.service.interface';
import { SessionEntity } from '../session/infra/entities';
import { EntityManager } from 'typeorm';

describe('SessionService', () => {
  let sessionService: AbstractSessionService;
  let mockSessionRepository: AbstractSessionRepository;
  let mockEntityManager: EntityManager;

  beforeEach(async () => {
    // 리포지토리 메서드 모킹
    mockSessionRepository = {
      create: jest.fn(),  // 세션 생성 메서드 모킹
      session: jest.fn(), // 세션 조회 메서드 모킹
      expire: jest.fn(),  // 세션 만료 메서드 모킹
    };

    // EntityManager 모킹
    mockEntityManager = {} as EntityManager;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AbstractSessionService, useClass: SessionService },
        {
          provide: AbstractSessionRepository,
          useValue: mockSessionRepository,  // 모킹된 레포지토리 제공
        },
      ],
    }).compile();

    sessionService = module.get<AbstractSessionService>(AbstractSessionService);
  });

  describe('세션 생성', () => {
    it('UUID가 중복되어 세션을 생성할 수 없는 경우 ConflictException을 던져야 한다', async () => {
      const userId = 1;

      // create 메서드가 null을 반환하도록 모킹하여 UUID 중복 상황을 시뮬레이션
      mockSessionRepository.create = jest.fn().mockResolvedValue(null);

      // 세션 생성 시 UUID 중복으로 인한 ConflictException이 발생하는지 확인
      await expect(sessionService.create(userId, mockEntityManager)).rejects.toThrow(
        ConflictException,
      );
    });

    it('정상적으로 세션이 생성되는 경우', async () => {
      const userId = 1;
      const sessionEntity = new SessionEntity();
      sessionEntity.uuid = 'some-unique-uuid';
      sessionEntity.userId = userId;

      // create 메서드가 세션 엔티티를 반환하도록 모킹
      mockSessionRepository.create = jest.fn().mockResolvedValue(sessionEntity);

      // 세션 생성 메서드 호출 및 결과 확인
      const result = await sessionService.create(userId, mockEntityManager);

      expect(mockSessionRepository.create).toHaveBeenCalledWith(expect.any(SessionEntity), mockEntityManager);
      expect(result).toEqual(sessionEntity);
    });
  });

  describe('세션 조회', () => {
    it('세션을 정상적으로 조회해야 한다', async () => {
      const uuid = 'some-unique-uuid';
      const sessionEntity = new SessionEntity();
      sessionEntity.uuid = uuid;

      // session 메서드가 세션 엔티티를 반환하도록 모킹
      mockSessionRepository.session = jest.fn().mockResolvedValue(sessionEntity);

      // 세션 조회 메서드 호출 및 결과 확인
      const result = await sessionService.session(uuid, mockEntityManager);

      expect(mockSessionRepository.session).toHaveBeenCalledWith(expect.any(SessionEntity), mockEntityManager);
      expect(result).toEqual(sessionEntity);
    });
  });

  describe('세션 만료', () => {
    it('세션을 정상적으로 만료해야 한다', async () => {
      const uuid = 'some-unique-uuid';
      const expiredSessionEntity = new SessionEntity();
      expiredSessionEntity.uuid = uuid;
      expiredSessionEntity.status = 'expired';

      // expire 메서드가 만료된 세션 엔티티를 반환하도록 모킹
      mockSessionRepository.expire = jest.fn().mockResolvedValue(expiredSessionEntity);

      // 세션 만료 메서드 호출 및 결과 확인
      const result = await sessionService.expire(uuid, mockEntityManager);

      expect(mockSessionRepository.expire).toHaveBeenCalledWith(expect.any(SessionEntity), mockEntityManager);
      expect(result).toEqual(expiredSessionEntity);
    });
  });
});
