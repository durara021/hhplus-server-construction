import { Module } from '@nestjs/common';
import { UserService } from './domain/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infra/entity.interfaces';
import { UserRepository } from './infra/repositories/user.repository';
import { AbstractUserRepository } from './domain/repository.interfaces';
import { CommonModule } from '../common/common.module';
import { AbstractUserService } from './domain/service.interfaces/user.service.interface';

@Module({
  imports: [ TypeOrmModule.forFeature([ UserEntity]), CommonModule ],
  providers: [
    { provide: AbstractUserService, useClass: UserService },
    { provide: AbstractUserRepository, useClass: UserRepository }
  ],
  exports: [ AbstractUserService ]
})
export class UserModule {}
