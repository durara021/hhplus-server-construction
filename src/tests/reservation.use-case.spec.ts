import { Test, TestingModule } from '@nestjs/testing';
import { QueueUsecase } from '../queue/app/queue.use-case';
import { AbstractQueueService } from '../queue/domain/service.interfaces';
import { DataSource, QueryRunner } from 'typeorm';
import { QueuePostResponseDto as ResPostDto, QueueGetResponseDto as ResGetDto } from '../queue/pres/dto';

describe('QueueUsecase', () => {
  let queueUsecase: QueueUsecase;
  let queueService: AbstractQueueService;
  let dataSource: DataSource;
  let queryRunner: QueryRunner;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueUsecase,
        {
          provide: AbstractQueueService,
          useValue: {
            enter: jest.fn(),
            myPosition: jest.fn(),
            myQueueInfo: jest.fn(),
          },
        },
        {
          provide: DataSource,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    queueUsecase = module.get<QueueUsecase>(QueueUsecase);
    queueService = module.get<AbstractQueueService>(AbstractQueueService);
    dataSource = module.get<DataSource>(DataSource);

    queryRunner = {
      startTransaction: jest.fn(),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
    } as unknown as QueryRunner;

    (dataSource.transaction as jest.Mock).mockImplementation((callback) => callback(queryRunner));
  });

  it('사용자가 큐에 들어가고 ResPostDto를 반환해야 한다', async () => {
    const userId = 1;
    const uuid = 'test-uuid';
    const enterResult = { id: 1, status: 'waiting' };
    const position = 3;

    // Mocking service responses
    (queueService.enter as jest.Mock).mockResolvedValue(enterResult);
    (queueService.myPosition as jest.Mock).mockResolvedValue(position);

    const result = await queueUsecase.enter(userId, uuid);

    expect(queueService.enter).toHaveBeenCalledWith(userId, uuid);
    expect(queueService.myPosition).toHaveBeenCalledWith(enterResult.id);

    // Validate the result
    expect(result).toBeInstanceOf(ResPostDto);
    expect(result.position).toBe(position);
    expect(result.status).toBe(enterResult.status);
  });

  it('사용자의 큐 위치를 조회하고 ResGetDto를 반환해야 한다', async () => {
    const userId = 1;
    const queueInfo = { id: 1, status: 'waiting' };
    const position = 3;

    // Mocking service responses
    (queueService.myQueueInfo as jest.Mock).mockResolvedValue(queueInfo);
    (queueService.myPosition as jest.Mock).mockResolvedValue(position);

    const result = await queueUsecase.myPosition(userId);

    expect(queueService.myQueueInfo).toHaveBeenCalledWith(userId);
    expect(queueService.myPosition).toHaveBeenCalledWith(queueInfo.id);

    // Validate the result
    expect(result).toBeInstanceOf(ResGetDto);
    expect(result.position).toBe(position);
    expect(result.status).toBe(queueInfo.status);
  });

  it('오류가 발생하면 트랜잭션이 롤백되어야 한다', async () => {
    const userId = 1;
    const uuid = 'test-uuid';

    // Mocking failure in queueService.enter
    (queueService.enter as jest.Mock).mockRejectedValue(new Error('Queue enter failed'));

    await expect(queueUsecase.enter(userId, uuid)).rejects.toThrow('Queue enter failed');

    expect(queryRunner.rollbackTransaction).toHaveBeenCalled();
  });
});
