import { Module } from '@nestjs/common';
import { SessionService } from './domain/session.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from './infra/entities';
import { SessionRepository } from './infra/repositories/session.repository';
import { AbstractSessionRepository } from './domain/repository.interfaces';
import { SessionController } from './pres/session.controller';
import { SessionUsecase } from './app/session.use-case';
import { AbstractSessionService } from './domain/service.interfaces/session.service.interface';
import { CommonModule } from '../common/common.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ TypeOrmModule.forFeature([SessionEntity]), UserModule, CommonModule ],
  controllers: [SessionController],
  providers: [ SessionUsecase,
    { provide: AbstractSessionService, useClass: SessionService },
    { provide: AbstractSessionRepository, useClass: SessionRepository },
   ],
  exports: [AbstractSessionService, AbstractSessionRepository], // 외부 모듈에서 사용할 수 있도록 export
})
export class SessionModule {}
