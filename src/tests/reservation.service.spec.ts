import { Test, TestingModule } from '@nestjs/testing';
import { AbstractReservationService } from '../reservation/domain/service.interfaces'; 
import { ReservationService } from '../reservation/domain/reservation.service';
import { AbstractReservationRepository } from '../reservation/domain/repository.interfaces';
import { ReservationEntity } from '../reservation/domain/entities';


describe('ReservationService - isAvailableItem', () => {
  let reservationService: AbstractReservationService;
  let reservationRepository: AbstractReservationRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: AbstractReservationRepository,
          useValue: {
            reservedItem: jest.fn(),
          },
        },
      ],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<AbstractReservationRepository>(AbstractReservationRepository);
  });

  it('should throw an error if the item is already reserved', async () => {
    const mainCateg = 1;
    const subCateg = 2;
    const minorCateg = 3;

    const reservedEntity = new ReservationEntity(); // 이미 예약된 아이템

    // 예약된 아이템이 존재한다고 가정하고 모킹
    jest.spyOn(reservationRepository, 'reservedItem').mockResolvedValueOnce(reservedEntity);

    // 이미 예약된 아이템이 있을 경우 에러가 발생하는지 테스트
    await expect(reservationService.isAvailableItem(mainCateg, subCateg, minorCateg)).rejects.toThrow(
      '이미 예약된 아이템입니다.'
    );
  });
});