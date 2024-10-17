import { ReservationService } from '../reservation/app/reservation.service';
import { AbstractReservationRepository } from '../reservation/domain/repository.interfaces';

describe('ReservationService 단위테스트', () => {
  let reservationService: ReservationService;
  let mockReservationRepository: AbstractReservationRepository;

  beforeEach(() => {
    mockReservationRepository = {} as any;
    reservationService = new ReservationService(mockReservationRepository);
  });


  describe('id 유효성 검사', () => {
    const category = 'category';
    const validId = 10;
    const ids = [null, -30, 40.5];
    ids.forEach(id =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(reservationService.reserve(category, id, validId, validId)).rejects.toThrow(`${id}는 입력할 수 없는 categoryId형식입니다.`);
      });
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(reservationService.reserve(category, validId, id, validId)).rejects.toThrow(`${id}는 입력할 수 없는 itemId형식입니다.`);
      });
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(reservationService.reserve(category, validId, validId, id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(reservationService.book(id, category)).rejects.toThrow(`${id}는 입력할 수 없는 reservationId형식입니다.`);
      });
    });
  });

});
