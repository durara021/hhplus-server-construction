import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConcertModule } from './concert/concert.module';
import { PaymentModule } from './payment/payment.module';
import { QueueModule } from './queue/queue.module';


@Module({
  imports: [ConcertModule, PaymentModule, QueueModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
