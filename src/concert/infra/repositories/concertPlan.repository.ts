import { EntityManager, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { AbstractConcertPlanRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { ConcertPlanEntity } from "../entities";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";
import { ObjectMapper } from "src/common/mapper/object-mapper";
import { ConcertResponseModel } from "src/concert/domain/models";

@Injectable()
export class ConcertPlanRepository implements AbstractConcertPlanRepository {

  private autoManagerRepository: AutoManagerRepository<ConcertPlanEntity>;

  constructor(
    @InjectRepository(ConcertPlanEntity)
    private readonly objectMapper: ObjectMapper,
    private readonly repository: Repository<ConcertPlanEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async planInfo(concertPlanEntity:ConcertPlanEntity): Promise<ConcertResponseModel | null> {
    return this.objectMapper.mapObject((await this.autoManagerRepository.proxyInstance.findOne({where: { concertId: concertPlanEntity.concertId }})), ConcertResponseModel);
  }

  async planInfos(concertPlanEntity:ConcertPlanEntity): Promise<ConcertResponseModel[]> {
    return this.objectMapper.mapArray((await this.autoManagerRepository.proxyInstance.find({where: {concertId: concertPlanEntity.concertId}})), ConcertResponseModel);
  }

}
