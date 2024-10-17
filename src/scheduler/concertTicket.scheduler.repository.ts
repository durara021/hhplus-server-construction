import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, In, LessThan } from 'typeorm';
import { AutoManagerRepository } from '../common/utils/auto-manager.repository';
import { ConcertTicketEntity } from '../concert/domain/entities';

@Injectable()
export class ConcertTicketSchedulerRepository {
  private autoManagerRepository: AutoManagerRepository<ConcertTicketEntity>;

  constructor(
    @InjectRepository(ConcertTicketEntity)
    private readonly repository: Repository<ConcertTicketEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async delete(fiveMinutesAgo: Date): Promise<void>{
    this.autoManagerRepository.proxyInstance.delete({status: 'temp', regDate: LessThan(fiveMinutesAgo),})
  }

}
