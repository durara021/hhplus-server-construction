import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AbstractConcertService } from '../concert/domain/service.interfaces';
import { AbstractConcertPlanRepository, AbstractConcertRepository } from '../concert/domain/repository.interfaces';
import { ConcertService } from '../concert/domain/concert.service';
import { EntityManager } from 'typeorm';

describe('ConcertService', () => {
  let concertService: AbstractConcertService;
  let mockConcertRepository: AbstractConcertRepository;
  let mockConcertPlanRepository: AbstractConcertPlanRepository;
  let mockEntityManager: EntityManager;

  beforeEach(async () => {
    // 리포지토리 메서드 모킹
    mockConcertRepository = {
      info: jest.fn(),  // 콘서트 정보 조회 메서드 모킹
    };

    mockConcertPlanRepository = {
      planInfos: jest.fn(),  // 콘서트 일정 목록 조회 메서드 모킹
      planInfo: jest.fn(),   // 단일 콘서트 일정 조회 메서드 모킹
    };

    // EntityManager 모킹
    mockEntityManager = {} as EntityManager;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: AbstractConcertRepository,
          useValue: mockConcertRepository,  // 모킹된 콘서트 레포지토리 제공
        },
        {
          provide: AbstractConcertPlanRepository,
          useValue: mockConcertPlanRepository,  // 모킹된 콘서트 일정 레포지토리 제공
        },
      ],
    }).compile();

    concertService = module.get<ConcertService>(ConcertService);
  });

  describe('콘서트 레포', () => {
    it('콘서트가 등록되어 있지 않은 경우', async () => {
      const id = 1;

      // info 메서드가 null을 반환하도록 설정
      mockConcertRepository.info = jest.fn().mockResolvedValue(null);

      // 콘서트 정보를 조회하려고 할 때 NotFoundException 발생 확인
      await expect(concertService.info({ id } as any, mockEntityManager)).rejects.toThrow(NotFoundException);
    });
  });

  describe('콘서트 일정 레포', () => {
    it('콘서트 일정이 없는 경우', async () => {
      const id = 1;

      // planInfos 메서드가 빈 배열을 반환하도록 설정
      mockConcertPlanRepository.planInfos = jest.fn().mockResolvedValue([]);

      // 콘서트 일정을 조회하려고 할 때 NotFoundException 발생 확인
      await expect(concertService.planInfos({ id } as any, mockEntityManager)).rejects.toThrow(NotFoundException);
    });

    it('콘서트 일정이 없는 경우(단일)', async () => {
      const planId = 1;

      // planInfo 메서드가 null을 반환하도록 설정
      mockConcertPlanRepository.planInfo = jest.fn().mockResolvedValue(null);

      // 단일 콘서트 일정을 조회하려고 할 때 NotFoundException 발생 확인
      await expect(concertService.planInfo({ planId } as any, mockEntityManager)).rejects.toThrow(NotFoundException);
    });
  });
});
