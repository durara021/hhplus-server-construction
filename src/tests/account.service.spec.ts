import { AccountService } from '../account/domain/account.service';
import { AbstractAccountRepository, AbstractAccountHistoryRepository } from '../account/domain/repository.interfaces';

describe('AccountService 단위테스트', () => {
  
  let accountService: AccountService;0
  let mockAccountRepository: AbstractAccountRepository;
  let mockAccountHistoryRepository: AbstractAccountHistoryRepository;

  beforeEach(() => {
    mockAccountRepository = {} as any;

    mockAccountHistoryRepository = {} as any;

    accountService = new AccountService(mockAccountRepository, mockAccountHistoryRepository);
  });


  it('잔액이 금액에비해 모자라는 경우', async () => {
    const ids = [null, -30, 40.5];
    const amount = 1000;
      await expect(accountService.use(1000,2000)).rejects.toThrow("사용 가능한 포인트가 부족합니다.");
  });

});
