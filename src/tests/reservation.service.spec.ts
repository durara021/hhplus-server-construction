import { Test, TestingModule } from '@nestjs/testing';
import { AbstractReservationService } from '../reservation/domain/service.interfaces';
import { ReservationService } from '../reservation/domain/reservation.service';
import { AbstractReservationRepository } from '../reservation/domain/repository.interfaces';
import { ReservationRequestEntity as ReservationEntity } from '../reservation/infra/entities';
import { ReservationRequestModel } from '../reservation/domain/models';
import { EntityManager } from 'typeorm';
import { NotFoundError } from 'rxjs';

describe('ReservationService - isAvailableItem', () => {
  let reservationService: AbstractReservationService;
  let mockReservationRepository: AbstractReservationRepository;
  let mockEntityManager: EntityManager;

  beforeEach(async () => {
    // 리포지토리 메서드 모킹
    mockReservationRepository = {
      reserve: jest.fn(),
      reservedItem: jest.fn(),  // 예약된 아이템 조회 메서드 모킹
      reservedItems: jest.fn(),
      statusUpdate: jest.fn(),
      statusesUpdate: jest.fn(),
      itemsByStatus: jest.fn(),
    };

    // EntityManager 모킹
    mockEntityManager = {} as EntityManager;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AbstractReservationService, useClass: ReservationService },
        {
          provide: AbstractReservationRepository,
          useValue: mockReservationRepository,  // 모킹된 레포지토리 제공
        },
      ],
    }).compile();

    reservationService = module.get<AbstractReservationService>(AbstractReservationService);
  });

  it('이미 예약된 아이템이 있을 경우 에러가 발생해야 한다', async () => {
    const reservationRequestModel = new ReservationRequestModel(); // 예약 요청 모델

    const reservedEntity = new ReservationEntity(); // 이미 예약된 아이템 엔티티

    // 예약된 아이템이 존재한다고 가정하고 모킹 설정
    mockReservationRepository.reservedItem = jest.fn().mockResolvedValue(reservedEntity);

    // 이미 예약된 아이템이 있을 때 NotFoundError가 발생하는지 확인
    await expect(
      reservationService.isAvailableItem(reservationRequestModel, mockEntityManager)
    ).rejects.toThrow('이미 예약된 아이템입니다.');
  });

  it('예약 가능한 아이템인 경우 정상적으로 동작해야 한다', async () => {
    const reservationRequestModel = new ReservationRequestModel(); // 예약 요청 모델

    // 예약된 아이템이 없다고 가정하고 null을 반환하도록 설정
    mockReservationRepository.reservedItem = jest.fn().mockResolvedValue(null);

    // 예약 가능한 경우 정상적으로 반환되는지 확인
    const result = await reservationService.isAvailableItem(reservationRequestModel, mockEntityManager);

    // 반환된 값이 null인 경우 올바르게 매핑되었는지 확인
    expect(result).toBeNull();
  });
});
