import { AccountService } from '../account/domain/account.service';
import { AbstractAccountRepository, AbstractAccountHistoryRepository } from '../account/domain/repository.interfaces';
import { AccountRequestModel } from '../account/domain/models';
import { ObjectMapper } from '../common/mapper/object-mapper';

describe('AccountService 단위 테스트', () => {
  let accountService: AccountService;
  let mockAccountRepository: AbstractAccountRepository;
  let mockAccountHistoryRepository: AbstractAccountHistoryRepository;
  let mockObjectMapper: ObjectMapper;

  beforeEach(() => {
    // 레포지토리 및 매퍼를 모킹 (Mock) 처리
    mockAccountRepository = {
      // 필요한 경우 여기에서 모킹된 메서드 정의 가능
    } as any;

    mockAccountHistoryRepository = {
      // 필요한 경우 여기에서 모킹된 메서드 정의 가능
    } as any;

    mockObjectMapper = {
      mapObject: jest.fn(), // mapObject 메서드 모킹
      mapArray: jest.fn(),  // mapArray 메서드 모킹
    } as any;

    // 모킹된 의존성을 사용하여 AccountService 인스턴스 생성
    accountService = new AccountService(mockAccountRepository, mockAccountHistoryRepository, mockObjectMapper);
  });

  it('잔액이 부족한 경우 오류를 발생시켜야 함', async () => {
    const accountModel = new AccountRequestModel(); // AccountRequestModel 인스턴스 생성 (기본 값 또는 모킹된 데이터로 초기화)
    accountModel.balance = 500;    // 현재 잔액
    accountModel.amount = 1000;    // 사용하려는 금액 (잔액보다 큼)

    // `use` 메서드를 호출할 때 잔액이 부족하면 오류가 발생하는지 확인
    await expect(accountService.use(accountModel)).rejects.toThrow("사용 가능한 포인트가 부족합니다.");
  });

  // 추가 테스트 케이스를 여기서 정의할 수 있음...
});
