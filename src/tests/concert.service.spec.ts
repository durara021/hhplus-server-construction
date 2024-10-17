import { ConcertService } from '../concert/app/concert.service';
import { AbstractConcertRepository, AbstractConcertPlanRepository, AbstractConcertTicketRepository } from '../concert/domain/repository.interfaces';

describe('ConcertService 단위테스트', () => {
  let concertService: ConcertService;
  let mockConcertRepository: AbstractConcertRepository;
  let mockConcertPlanRepository: AbstractConcertPlanRepository;
  let mockConcertTicketRepository: AbstractConcertTicketRepository;

  beforeEach(() => {
    mockConcertRepository = {} as any;
    mockConcertPlanRepository = {} as any;
    mockConcertTicketRepository = {
        reservedTickets: jest.fn().mockResolvedValue([]), // reservedTickets에서 빈 배열 반환하도록 모킹
    } as any;

    concertService = new ConcertService(mockConcertRepository, mockConcertPlanRepository, mockConcertTicketRepository);
  });


  describe('id 유효성 검사', () => {
    const ids = [null, -30, 40.5];
    const capacity = 1000;
    ids.forEach(id =>{
      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(concertService.concertInfo(id)).rejects.toThrow(`${id}는 입력할 수 없는 concertId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(concertService.concertPlans(id)).rejects.toThrow(`${id}는 입력할 수 없는 concertId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(concertService.concertPlanInfo(id)).rejects.toThrow(`${id}는 입력할 수 없는 concertPlanId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(concertService.availableSeats(id, capacity)).rejects.toThrow(`${id}는 입력할 수 없는 concertPlanId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(concertService.reserve(id, 1)).rejects.toThrow(`${id}는 입력할 수 없는 ticketId형식입니다.`);
      });

      it('아이디에 양의 정수가 아닌 수가 들어갔을 때', async () => {
        await expect(concertService.reserve(1, id)).rejects.toThrow(`${id}는 입력할 수 없는 userId형식입니다.`);
      });
      
    });
  });

  describe('capacity 유효성 검사', () => {
    const id = 1000;
    const capacitys = [null, -30, 40.5];
    capacitys.forEach(capacity =>{
        it('정원에 양의 정수가 아닌 수가 들어갔을 때', async () => {
            await expect(concertService.availableSeats(id, capacity)).rejects.toThrow(`${capacity}는 입력할 수 없는 capacity형식입니다.`);
        });
    });
  });

});
