import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Patch('/charges')
  async charge(
    @Param() userId: string,
    @Param() amount: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: '',
      data: {
        "userName": "userName1",
        "amount": 50000,
        "point": 100000,
        "accountStat": "충전완료",
        "regDate": Date.now()
      },
    };
  }

  @Get('/:userId/accounts')
  async account(
    @Param('userId') userId: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: '',
      data: {
        "userName": 1,
        "account": 150000
      },
    };
  }

  @Get('/pay')
  async payment(
    @Param('ticketId') ticketId: string,
    @Param('userId') userId: string,
  ) {
    return {
      statusCode: HttpStatus.OK,
      message: '',
      data: {
        "ticketId": 1,
        "userId": 1,
        "stat": "booked",
        "tokenStat": "complete"
      },
    };
  }

}
