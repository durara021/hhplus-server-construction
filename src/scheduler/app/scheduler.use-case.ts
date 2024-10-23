// app/scheduler/scheduler.service.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SchedulerService } from '../domain/scheduler.service';

@Injectable()
export class SchedulerUsecase {
  constructor(
    private readonly schedulerService: SchedulerService
  ) {}

  // 10분마다 대기열의 상태를 업데이트하는 작업
  @Cron(CronExpression.EVERY_10_MINUTES)
  async activateWaitingQueue() {
    console.log('1분마다 대기열의 waiting 상태를 active로 변경합니다.');
    const capacity = 100;
    let status = 'waiting';
    // 100명의 waiting 상태 사용자 active 상태로 변경
    const userIds = await this.schedulerService.pendingUser(capacity, status);

    
    // 사용자 상태 업데이트
    status = 'active';
    await this.schedulerService.queueStatusesUpdate(userIds, status);
    console.log(`${userIds.length}명의 사용자를 active 상태로 변경 완료`);
  }

  @Cron(CronExpression.EVERY_MINUTE) // 매 분마다 실행
  async removeUnconfirmedReservations() {
    //5분이 지난 아이템 조회
    const rule: number = 5;
    let status = 'temp';
    const expiredItems = await this.schedulerService.tempItems(status, rule);
    
    //해당 아이템 삭제 처리
    status = 'delete';
    await this.schedulerService.reservationStatusesUpdate(expiredItems, status);
    console.log('5분이 경과된 임시 티켓 예약이 삭제되었습니다.');
  }

}
