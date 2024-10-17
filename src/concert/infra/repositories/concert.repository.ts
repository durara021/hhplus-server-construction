import { EntityManager, Repository } from "typeorm";
import { ConcertEntity } from "../../domain/entities/concert.entity";
import { Injectable } from "@nestjs/common";
import { AbstractConcertRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class ConcertRepository implements AbstractConcertRepository {
  
  private autoManagerRepository: AutoManagerRepository<ConcertEntity>;

  constructor(
    @InjectRepository(ConcertEntity)
    private readonly repository: Repository<ConcertEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async concertInfo(concertEntity:ConcertEntity): Promise<ConcertEntity | undefined> {
    return await this.autoManagerRepository.proxyInstance.findOne({ where: { id: concertEntity.id } });
  }
  
}
