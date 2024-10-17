import { EntityManager, Repository } from "typeorm";
import { ConcertEntity } from "../../domain/entities/concert.entity";
import { Injectable } from "@nestjs/common";
import { AbstractConcertPlanRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { ConcertPlanEntity } from "../../domain/entities";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class ConcertPlanRepository implements AbstractConcertPlanRepository {

  private autoManagerRepository: AutoManagerRepository<ConcertPlanEntity>;

  constructor(
    @InjectRepository(ConcertPlanEntity)
    private readonly repository: Repository<ConcertPlanEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async concertPlanInfo(concertPlanEntity:ConcertPlanEntity): Promise<ConcertPlanEntity | null> {
    return this.autoManagerRepository.proxyInstance.findOne({where: { concertId: concertPlanEntity.concertId }});
  }

  async concertPlanInfos(concertPlanEntity:ConcertPlanEntity): Promise<ConcertPlanEntity[]> {
    return this.autoManagerRepository.proxyInstance.find({where: {concertId: concertPlanEntity.concertId}});
  }

}
