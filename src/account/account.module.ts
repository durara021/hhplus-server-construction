import { Module } from '@nestjs/common';
import { AccountService } from './domain/account.service';
import { AccountController } from './pres/account.controller';
import { AbstractAccountService } from './domain/service.interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, AccountHistoryEntity } from './infra/entities';
import { AbstractAccountHistoryRepository, AbstractAccountRepository } from './domain/repository.interfaces';
import { AccountHistoryRepository, AccountRepository } from './infra/repositories';
import { AccountUsecase } from './app/account.use-case';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [ TypeOrmModule.forFeature([AccountEntity, AccountHistoryEntity]), CommonModule ],
  controllers: [AccountController],
  providers: [
    AccountUsecase, 
    { provide: AbstractAccountService, useClass: AccountService },
    { provide: AbstractAccountRepository, useClass: AccountRepository },
    { provide: AbstractAccountHistoryRepository, useClass: AccountHistoryRepository },
  ],
  exports: [AbstractAccountService]
})
export class AccountModule {}
