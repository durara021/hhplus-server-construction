import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from './reservation/reservation.module';
import { ConcertModule } from './concert/concert.module';
import { PaymentModule } from './payment/payment.module';
import { AccountModule } from './account/account.module';
import { SessionModule } from './session/session.module';
import { SessionService } from './session/domain/session.service';
import { APP_GUARD } from '@nestjs/core';
import { SessionGuard } from './common/guard/session.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GuardModule } from './common/guard/guard.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ReservationModule, ConcertModule, PaymentModule,
    AccountModule, SessionModule, GuardModule, QueueModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as any,
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/entity/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        extra: {
          connectionLimit: configService.get<number>('DB_CONNECTION_LIMIT'),
        },
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    SessionService,
    {
      provide: APP_GUARD,
      useClass: SessionGuard, // 전역 가드로 설정
    },
  ],
})
export class AppModule {}
