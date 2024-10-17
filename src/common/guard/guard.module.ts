import { Global, Module } from '@nestjs/common';
import { UserValidationGuard } from './user-validation.guard';
import { UserModule } from '../../user/user.module';

@Global()
@Module({
    imports: [ UserModule ],
    providers: [ UserValidationGuard ]
})
export class GuardModule {}
