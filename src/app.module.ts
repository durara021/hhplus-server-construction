import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertModule } from './concert/concert.module';
import { PaymentModule } from './payment/payment.module';
import { QueueModule } from './queue/queue.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConcertModule, PaymentModule, QueueModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
