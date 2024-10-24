import { EntityManager } from "typeorm";
import { ConcertEntity } from "../entities/concert.entity";
import { Injectable } from "@nestjs/common";
import { AbstractConcertRepository } from "../../domain/repository.interfaces";
import { ObjectMapper } from "../../../common/mapper/object-mapper";
import { ConcertResponseModel } from "../../../concert/domain/models";

@Injectable()
export class ConcertRepository implements AbstractConcertRepository {
  
  constructor(
    private readonly objectMapper: ObjectMapper,
  ) {}

  async info(concertEntity:ConcertEntity, manager: EntityManager): Promise<ConcertResponseModel | undefined> {
    return this.objectMapper.mapObject((await manager.findOne(ConcertEntity, { where: { id: concertEntity.id } })), ConcertResponseModel);
  }
  
}
