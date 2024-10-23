import { EntityManager, Repository } from "typeorm";
import { ConcertEntity } from "../entities/concert.entity";
import { Injectable } from "@nestjs/common";
import { AbstractConcertRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";
import { ObjectMapper } from "src/common/mapper/object-mapper";
import { ConcertResponseModel } from "src/concert/domain/models";

@Injectable()
export class ConcertRepository implements AbstractConcertRepository {
  
  private autoManagerRepository: AutoManagerRepository<ConcertEntity>;

  constructor(
    @InjectRepository(ConcertEntity)
    private readonly objectMapper: ObjectMapper,
    private readonly repository: Repository<ConcertEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async info(concertEntity:ConcertEntity): Promise<ConcertResponseModel | undefined> {
    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.findOne({ where: { id: concertEntity.id } })), ConcertResponseModel);
  }
  
}
