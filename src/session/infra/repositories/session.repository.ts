import { EntityManager, Not, Repository } from "typeorm";
import { SessionEntity } from "../../domain/entities/session.entity";
import { Injectable } from "@nestjs/common";
import { AbstractSessionRepository } from "../../domain/repository.interfaces";
import { InjectRepository } from "@nestjs/typeorm";
import { AutoManagerRepository } from "../../../common/utils/auto-manager.repository";

@Injectable()
export class SessionRepository implements AbstractSessionRepository {
  
  private autoManagerRepository: AutoManagerRepository<SessionEntity>;

  constructor(
    @InjectRepository(SessionEntity)
    private readonly repository: Repository<SessionEntity>,
    private readonly entityManager?: EntityManager,
  ) {
    // AutoManagerRepository 인스턴스 생성
    this.autoManagerRepository = new AutoManagerRepository(this.repository, this.entityManager);
  }

  async create(sessionEntity:SessionEntity): Promise<SessionEntity> {
    return await this.autoManagerRepository.proxyInstance.save(sessionEntity);
  }

  async session(sessionEntity: SessionEntity): Promise<SessionEntity> {
    return await this.autoManagerRepository.proxyInstance.findOne(
      { where: { uuid : sessionEntity.uuid, } }
    );
  }
  
  async expire(sessionEntity: SessionEntity): Promise<SessionEntity> {
    await this.autoManagerRepository.proxyInstance.update(
      { uuid : sessionEntity.uuid },
      { status: sessionEntity.status }
    );

    return this.autoManagerRepository.proxyInstance.findOne(
      { where : { uuid: sessionEntity.uuid } }
    );
  }

}
