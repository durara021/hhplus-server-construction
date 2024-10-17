import { QueueService } from '../queue/app/queue.service';
import { AbstractQueueRepository } from '../queue/domain/repository.interfaces';

describe('QueueService 단위테스트', () => {
  let queueService: QueueService;
  let mockQueueRepository: AbstractQueueRepository;

  beforeEach(() => {
    mockQueueRepository = {} as any;
    queueService = new QueueService(mockQueueRepository);
  });


  describe('userId 유효성 검사', () => {
    const ids = [null, -30, 40.5];
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    ids.forEach(id =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(queueService.enter(id, uuid)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(queueService.myPosition(id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
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
        await expect(queueService.enter(userId, uuid)).rejects.toThrow('uuidv4형식에 맞지 않는 string입니다.');
      });
    });
  });

});
