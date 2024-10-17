import { AccountService } from '../account/app/account.service';
import { AbstractAccountRepository, AbstractAccountHistoryRepository } from '../account/domain/repository.interfaces';

describe('AccountService 단위테스트', () => {
  
  let accountService: AccountService;
  let mockAccountRepository: AbstractAccountRepository;
  let mockAccountHistoryRepository: AbstractAccountHistoryRepository;

  beforeEach(() => {
    mockAccountRepository = {} as any;

    mockAccountHistoryRepository = {} as any;

    accountService = new AccountService(mockAccountRepository, mockAccountHistoryRepository);
  });


  describe('id 유효성 검사', () => {
    const ids = [null, -30, 40.5];
    const amount = 1000;
    ids.forEach(id =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(accountService.point(id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(accountService.history(id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(accountService.charge(id, amount)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(accountService.use(id, amount)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(accountService.record(id, amount, 'waitintg')).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
    });
  });

  describe('amount 유효성 검사', () => {
    const id = 1000;
    const amounts = [null, -30, 40.5];
    amounts.forEach(amount =>{
      it('충전 금액이 양의 정수가 아닐때', async () => {
        await expect(accountService.charge(id, amount)).rejects.toThrow(`${amount}는 입력할 수 없는 amount형식입니다.`);
      });

      it('충전 금액이 양의 정수가 아닐때', async () => {
        await expect(accountService.use(id, amount)).rejects.toThrow(`${amount}는 입력할 수 없는 balance형식입니다.`);
      });

      it('충전 금액이 양의 정수가 아닐때', async () => {
        await expect(accountService.record(id, amount, 'charge')).rejects.toThrow(`${amount}는 입력할 수 없는 amount형식입니다.`);
      });
    });
  });

});
