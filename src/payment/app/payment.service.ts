import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../domain/entities';
import { AbstractPaymentRepository } from '../domain/repository.interfaces';
import { AbstractPaymentService } from '../domain/payemnt.service.interfaces';

@Injectable()
export class PaymentService implements AbstractPaymentService{
  
  constructor(
    private readonly paymentRepository: AbstractPaymentRepository,
  ) {}

  async record(userId: number, reservationId: number){
    
    const paymentEntity: PaymentEntity = new PaymentEntity();
    paymentEntity.userId = this.isValidNum(userId, 'userId');
    paymentEntity.reservationId = this.isValidNum(reservationId, 'reservationId');

    return this.paymentRepository.record(paymentEntity);
  }

  // 사용 가능한 숫자인지 확인(양의 정수)
	private isValidNum(num: any, gubun: string): number{
		if(Number.isInteger(num) && num > 0) return num;
		throw new Error(`${num}는 입력할 수 없는 ${gubun}형식입니다.`);
	}
}
