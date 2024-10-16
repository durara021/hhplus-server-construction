import { Module } from '@nestjs/common';
import { UserService } from './app/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entity.interfaces';
import { UserRepository } from './infra/repositories/user.repository';
import { AbstractUserRepository } from './domain/repository.interfaces';

@Module({
  imports: [ TypeOrmModule.forFeature([ UserEntity]) ],
  providers: [ UserService,
    { provide: AbstractUserRepository, useClass: UserRepository }
  ],
  exports: [ UserService ]
})
export class UserModule {}
