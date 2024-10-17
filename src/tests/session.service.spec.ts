import { SessionService } from '../session/app/session.service';
import { AbstractSessionRepository } from '../session/domain/repository.interfaces';

describe('SessionService 단위테스트', () => {
  let sessionService: SessionService;
  let mockSessionRepository: AbstractSessionRepository;

  beforeEach(() => {
    mockSessionRepository = {} as any;
    sessionService = new SessionService(mockSessionRepository);
  });


  describe('userId 유효성 검사', () => {
    const userIds = [null, -30, 40.5];
    const uuid = '12345678-1234-4987-a123-ab1234567890';
    userIds.forEach(id =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(sessionService.create(uuid, id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(sessionService.session(id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
    });
  });
  
  describe('uuid 형태 검사', () => {
    const userId = 1000;
    const uuids = [
      '123e4567-e89b-52d3-a456-426614174000', // 잘못된 버전 (4가 아님)
      '123e4567e89b42d3a456426614174000',     // 하이픈 없음
      'g23e4567-e89b-42d3-a456-426614174000', // 잘못된 문자 (g 포함)
      '123e4567-e89b-42d3-a456-42661417400',  // 길이 부족
      '123e4567-e89b-42d3-a456-4266141740000' // 길이 초과
    ];
    uuids.forEach(uuid => {
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(sessionService.create(uuid, userId)).rejects.toThrow('uuidv4형식에 맞지 않는 string입니다.');
      });
    });
  });

});
