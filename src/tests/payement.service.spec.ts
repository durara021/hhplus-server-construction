import { PaymentService } from '../payment/app/payment.service';
import { AbstractPaymentRepository } from '../payment/domain/repository.interfaces';

describe('PaymentService 단위테스트', () => {
  let paymentService: PaymentService;
  let mockPaymentRepository: AbstractPaymentRepository;

  beforeEach(() => {
    mockPaymentRepository = {} as any;
    paymentService = new PaymentService(mockPaymentRepository);
  });


  describe('userId 유효성 검사', () => {
    const ids = [null, -30, 40.5];
    const reservationId = 1000;
    ids.forEach(id =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(paymentService.record(id, reservationId)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
    });
  });
  
  describe('id 유효성 검사', () => {
    const userId = 1000;
    const reservationIds = [null, -30, 40.5];
    reservationIds.forEach(reservationId =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(paymentService.record(userId, reservationId)).rejects.toThrow(`${reservationId}는 입력할 수 없는 reservationId형식입니다.`);
      });
    });
  });

});
