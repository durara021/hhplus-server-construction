import { EntityManager, Repository } from "typeorm";
import { ConcertEntity } from "../../domain/entities/concert.entity";
import { Injectable } from "@nestjs/common";
import { AbstractConcertTicketRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { ConcertTicketEntity } from "../../domain/entities";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class ConcertTicketRepository implements AbstractConcertTicketRepository {

  private autoManagerRepository: AutoManagerRepository<ConcertTicketEntity>;

  constructor(
    @InjectRepository(ConcertTicketEntity)
    private readonly repository: Repository<ConcertTicketEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async reservedTickets(concertTicketEntity:ConcertTicketEntity): Promise<ConcertTicketEntity[]> {
    return this.autoManagerRepository.proxyInstance.find({where: {concertPlanId: concertTicketEntity.concertPlanId}});
  }

  async reserve(concertTicketEntity:ConcertTicketEntity): Promise<ConcertTicketEntity> {
    return this.autoManagerRepository.proxyInstance.save(concertTicketEntity);
  }


}
