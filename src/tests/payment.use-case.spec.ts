import { Test, TestingModule } from '@nestjs/testing';
import { PaymentUsecase } from '../payment/app/payment.use-case';
import { AbstractPaymentService } from '../payment/domain/payemnt.service.interfaces';
import { AbstractAccountService } from '../account/domain/service.interfaces';
import { AbstractReservationService } from '../reservation/domain/service.interfaces';
import { AbstractQueueService } from '../queue/domain/service.interfaces';
import { DataSource, QueryRunner } from 'typeorm';
import { PaymentPostResponseDto as ResPostDto } from '../payment/pres/dto';

describe('PaymentUsecase', () => {
  let paymentUsecase: PaymentUsecase;
  let paymentService: AbstractPaymentService;
  let accountService: AbstractAccountService;
  let reservationService: AbstractReservationService;
  let queueService: AbstractQueueService;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentUsecase,
        {
          provide: AbstractPaymentService,
          useValue: { record: jest.fn() },
        },
        {
          provide: AbstractAccountService,
          useValue: { point: jest.fn(), use: jest.fn(), update: jest.fn() },
        },
        {
          provide: AbstractReservationService,
          useValue: { book: jest.fn() },
        },
        {
          provide: AbstractQueueService,
          useValue: { expire: jest.fn() },
        },
        {
          provide: DataSource,
          useValue: { transaction: jest.fn() },
        },
      ],
    }).compile();

    paymentUsecase = module.get<PaymentUsecase>(PaymentUsecase);
    paymentService = module.get<AbstractPaymentService>(AbstractPaymentService);
    accountService = module.get<AbstractAccountService>(AbstractAccountService);
    reservationService = module.get<AbstractReservationService>(AbstractReservationService);
    queueService = module.get<AbstractQueueService>(AbstractQueueService);
    dataSource = module.get<DataSource>(DataSource);

    queryRunner = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
    } as unknown as QueryRunner;

    (dataSource.transaction as jest.Mock).mockImplementation((callback) => callback(queryRunner));
  });

  it('pay 호출 시 결제를 처리하고 ResPostDto를 반환해야 한다', async () => {
    const userId = 1;
    const reservationId = 101;
    const price = 100;

    const beforeBalance = { balance: 200 };
    const updatedBalance = 100;
    const paymentRecord = { userId, reservationId, regDate: new Date() };

    // Mocking service responses
    (accountService.point as jest.Mock).mockResolvedValue(beforeBalance);
    (accountService.use as jest.Mock).mockResolvedValue(updatedBalance);
    (accountService.update as jest.Mock).mockResolvedValue(undefined);
    (reservationService. as jest.Mock).mockResolvedValue(undefined);
    (paymentService.record as jest.Mock).mockResolvedValue(paymentRecord);
    (queueService.expire as jest.Mock).mockResolvedValue(undefined);

    const result = await paymentUsecase.pay(userId, reservationId, price);

    expect(accountService.point).toHaveBeenCalledWith(userId);
    expect(accountService.use).toHaveBeenCalledWith(beforeBalance.balance, price);
    expect(accountService.update).toHaveBeenCalledWith(userId, updatedBalance);
    expect(reservationService.book).toHaveBeenCalledWith(reservationId, 'confirmed');
    expect(paymentService.record).toHaveBeenCalledWith(userId, price);
    expect(queueService.expire).toHaveBeenCalledWith(userId);

    // Validate the result
    expect(result).toBeInstanceOf(ResPostDto);
    expect(result.userId).toBe(paymentRecord.userId);
    expect(result.reservationId).toBe(paymentRecord.reservationId);
    expect(result.regDate).toBe(paymentRecord.regDate);
  });

  it('오류가 발생하면 트랜잭션이 롤백되어야 한다', async () => {
    const userId = 1;
    const reservationId = 101;
    const price = 100;

    const beforeBalance = { balance: 200 };

    // Mocking failure in account update
    (accountService.point as jest.Mock).mockResolvedValue(beforeBalance);
    (accountService.use as jest.Mock).mockResolvedValue(100);
    (accountService.update as jest.Mock).mockRejectedValue(new Error('Account update failed'));

    await expect(paymentUsecase.pay(userId, reservationId, price)).rejects.toThrow('Account update failed');

    expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
  });

});
