import { Module } from '@nestjs/common';
import { SessionService } from './domain/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './domain/entities';
import { SessionRepository } from './infra/repositories/session.repository';
import { AbstractSessionRepository } from './domain/repository.interfaces';
import { SessionController } from './pres/session.controller';
import { SessionUsecase } from './app/session.use-case';

@Module({
  imports: [ TypeOrmModule.forFeature([SessionEntity]) ],
  controllers: [SessionController],
  providers: [ SessionService, SessionUsecase,
    { provide: AbstractSessionRepository, useClass: SessionRepository }
   ],
  exports: [SessionService, AbstractSessionRepository], // 외부 모듈에서 사용할 수 있도록 export
})
export class SessionModule {}
