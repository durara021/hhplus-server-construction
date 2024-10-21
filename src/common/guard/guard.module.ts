import { Global, Module } from '@nestjs/common';
import { UserModule } from '../../user/user.module';
import { SessionGuard } from './session.guard';

@Global()
@Module({
    imports: [ UserModule ],
    providers: [ SessionGuard ]
})
export class GuardModule {}
