import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { ConcertModule } from '../concert/concert.module';
import { PaymentModule } from '../payment/payment.module';
import { QueueModule } from '../queue/queue.module';
import { ReservationModule } from '../reservation/reservation.module';
import { SessionModule } from '../session/session.module';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { GuardModule } from '../common/guard/guard.module';

describe('통합 테스트', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ReservationModule, ConcertModule, PaymentModule,
        AccountModule, SessionModule, GuardModule, QueueModule,
        TypeOrmModule.forRoot({
          type: 'mysql',  // 사용하려는 데이터베이스 유형 (예: mysql, sqlite 등)
          host: 'localhost', // 데이터베이스 호스트
          port: 3306,        // 포트 번호
          username: 'tester',  // 데이터베이스 사용자 이름
          password: 'qwe124!@$', // 데이터베이스 비밀번호
          database: 'hhpluscleanarchitecture',  // 사용할 데이터베이스 이름
          entities: [ __dirname + '/entitiy/*.entity{.ts,.js}' ],  // 엔티티 배열
          synchronize: true, // 개발 시 자동으로 스키마를 동기화 (생산 환경에서는 false로 설정 권장)
          extra: {
            connectionLimit: 100,
          },
          logging: true
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });
  
  afterAll(async () => {
    await app.close();
  });

  it('/reservations (POST)', () => {
    return request(app.getHttpServer())
      .post('/reservations') // POST로 변경
      .send({ userId: 1 })
      .expect((response) => {
        console.log(response);
      });
  });

  it('/concerts/:concertId/dates (GET)', () => {
    return request(app.getHttpServer())
      .get('/concerts/123/dates')
      .expect((response) => {
        console.log(response);
      });
  });

  it('/payments (POST)', () => {
    return request(app.getHttpServer())
      .post('/payments')
      .send({ userId:1, reservationId:1 })
      .expect(201)
      .expect((response) => {
        console.log(response);
      });
    });

});