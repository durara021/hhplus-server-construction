import { Test, TestingModule } from '@nestjs/testing';
import { AccountUsecase } from '../account/app/account.use-case';
import { AbstractAccountService } from '../account/domain/service.interfaces/account.service.interface';
import { DataSource } from 'typeorm';
import { AccountPostResponseDto as ResPostDto } from '../account/pres/dto';
import { AccountHistoryEntity } from '../account/domain/entities';

describe('AccountUsecase - charge', () => {
  let accountUsecase: AccountUsecase;
  let accountService: AbstractAccountService;
  let dataSource: DataSource;

  const mockAccountService = {
    point: jest.fn(),
    charge: jest.fn(),
    update: jest.fn(),
    record: jest.fn(),
  };

  const mockDataSource = {
    transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountUsecase,
        { provide: AbstractAccountService, useValue: mockAccountService },
        { provide: DataSource, useValue: mockDataSource },
      ],
    }).compile();

    accountUsecase = module.get<AccountUsecase>(AccountUsecase);
    accountService = module.get<AbstractAccountService>(AbstractAccountService);
    dataSource = module.get<DataSource>(DataSource);
  });

  it('포인트를 충전하고 ResPostDto를 반환해야 한다', async () => {
    const id = 100;
    const userId = 1;
    const amount = 100;

    const mockPoint = { userId, balance: 500 };
    const mockNewBalance = 600;
    const mockRecordResult: AccountHistoryEntity = {
      id,
      userId,
      amount,
      stat: 'charge',
      regDate: new Date(),
    };

    // accountService 및 dataSource 동작을 모킹(mocking)
    mockAccountService.point.mockResolvedValue(mockPoint);
    mockAccountService.charge.mockResolvedValue(mockNewBalance);
    mockAccountService.update.mockResolvedValue(undefined);
    mockAccountService.record.mockResolvedValue(mockRecordResult);
    mockDataSource.transaction.mockImplementation(async (callback: any) => {
      return await callback();
    });

    const expectedResponse = new ResPostDto(
      mockRecordResult.userId,
      mockRecordResult.amount,
      mockRecordResult.stat,
      mockRecordResult.regDate,
    );

    const result = await accountUsecase.charge(userId, amount);

    expect(mockAccountService.point).toHaveBeenCalledWith(userId);
    expect(mockAccountService.charge).toHaveBeenCalledWith(mockPoint.balance, amount);
    expect(mockAccountService.update).toHaveBeenCalledWith(userId, mockNewBalance);
    expect(mockAccountService.record).toHaveBeenCalledWith(userId, amount, 'charge');
    expect(result).toEqual(expectedResponse);
  });
});
