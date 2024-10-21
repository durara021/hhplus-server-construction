import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AbstractConcertService } from '../concert/domain/service.interfaces';
import { AbstractConcertPlanRepository, AbstractConcertRepository } from '../concert/domain/repository.interfaces';
import { ConcertService } from '../concert/domain/concert.service';

describe('ConcertService', () => {
  let concertService: AbstractConcertService;
  let concertRepository: AbstractConcertRepository;
  let concertPlanRepository: AbstractConcertPlanRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertService,
        {
          provide: AbstractConcertRepository,
          useValue: {
            concertInfo: jest.fn(),
          },
        },
        {
          provide: AbstractConcertPlanRepository,
          useValue: {
            concertPlanInfos: jest.fn(),
            concertPlanInfo: jest.fn(),
          },
        },
      ],
    }).compile();

    concertService = module.get<ConcertService>(ConcertService);
    concertRepository = module.get<AbstractConcertRepository>(AbstractConcertRepository);
    concertPlanRepository = module.get<AbstractConcertPlanRepository>(AbstractConcertPlanRepository);
  });

  describe('콘서트 레포', () => {
    it('콘서트가 등록되어 있지 않은 경우', async () => {
      const concertId = 1;

      // concertInfo 메소드가 null을 반환하도록 모킹
      jest.spyOn(concertRepository, 'concertInfo').mockResolvedValueOnce(null);

      await expect(concertService.concertInfo(concertId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('콘서트 일정 레포', () => {
    it('콘서트 일정이 없는 경우', async () => {
      const concertId = 1;

      // concertPlanInfos가 빈 배열을 반환하도록 모킹
      jest.spyOn(concertPlanRepository, 'concertPlanInfos').mockResolvedValueOnce([]);

      await expect(concertService.concertPlanInfos(concertId)).rejects.toThrow(NotFoundException);
    });

    it('콘서트 일정이 없는 경우(단일)', async () => {
      const concertPlanId = 1;

      // concertPlanInfo가 null을 반환하도록 모킹
      jest.spyOn(concertPlanRepository, 'concertPlanInfo').mockResolvedValueOnce(null);
      await expect(concertService.concertPlanInfo(concertPlanId)).rejects.toThrow(NotFoundException);
    });
  });

});
