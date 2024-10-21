import { Test, TestingModule } from '@nestjs/testing';
import { ConcertUsecase } from '../concert/app/concert.use-case';
import { AbstractConcertService } from '../concert/domain/service.interfaces/concert.service';
import { AbstractReservationService } from '../reservation/domain/service.interfaces';
import { DataSource } from 'typeorm';
import { ConcertGetResponseDto as ResGetDto } from '../concert/pres/dto';

describe('ConcertUsecase', () => {
  let concertUsecase: ConcertUsecase;
  let concertService: AbstractConcertService;
  let reservationService: AbstractReservationService;
  let dataSource: DataSource;

  const mockConcertService = {
    concertInfo: jest.fn(),
    concertPlanInfos: jest.fn(),
    concertPlanInfo: jest.fn(),
  };

  const mockReservationService = {
    availableItems: jest.fn(),
  };

  const mockDataSource = {
    transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConcertUsecase,
        { provide: AbstractConcertService, useValue: mockConcertService },
        { provide: AbstractReservationService, useValue: mockReservationService },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    concertUsecase = module.get<ConcertUsecase>(ConcertUsecase);
    concertService = module.get<AbstractConcertService>(AbstractConcertService);
    reservationService = module.get<AbstractReservationService>(AbstractReservationService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('concertDates 메서드는 콘서트 날짜 정보를 반환해야 한다', async () => {

    const concertId = 1;
    const mockConcertInfo = { id: concertId, title: 'Mock Concert' };
    const mockConcertPlans = [new Date('2024-10-01'), new Date('2024-10-02') ];

    // mock 설정
    mockConcertService.concertInfo.mockResolvedValue(mockConcertInfo);
    mockConcertService.concertPlanInfos.mockResolvedValue(mockConcertPlans);
    mockDataSource.transaction.mockImplementation(async (callback: any) => {
      return await callback();
    });

    const expectedResponse = new ResGetDto(mockConcertInfo.title, null, mockConcertPlans, null);

    const result = await concertUsecase.concertDates(concertId);

    expect(mockConcertService.concertInfo).toHaveBeenCalledWith(concertId);
    expect(mockConcertService.concertPlanInfos).toHaveBeenCalledWith(mockConcertInfo.id);
    expect(result).toEqual(expectedResponse);

  });

  it('concertSeats 메서드는 콘서트 좌석 정보를 반환해야 한다', async () => {
    const concertPlanId = 1;
    const mockConcertPlanInfo = { concertDate: '2024-10-01', capacity: 100 };
    const mockConcertSeats = [{ seatId: 1, available: true }, { seatId: 2, available: false }];

    // mock 설정
    mockConcertService.concertPlanInfo.mockResolvedValue(mockConcertPlanInfo);
    mockReservationService.availableItems.mockResolvedValue(mockConcertSeats);
    mockDataSource.transaction.mockImplementation(async (callback: any) => {
      return await callback();
    });

    const expectedResponse = new ResGetDto(null, new Date(mockConcertPlanInfo.concertDate), null, mockConcertSeats.map(concertPlan => concertPlan.seatId));
    const result = await concertUsecase.concertSeats(concertPlanId);

    expect(mockConcertService.concertPlanInfo).toHaveBeenCalledWith(concertPlanId);
    expect(mockReservationService.availableItems).toHaveBeenCalledWith(1, concertPlanId, mockConcertPlanInfo.capacity);
    expect(result).toEqual(expectedResponse);
  });
});
