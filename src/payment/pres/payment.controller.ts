import { Controller, Post, Body } from '@nestjs/common';
import { PaymentPostResponseDto as ResPostDto } from './dto';
import { PaymentUsecase } from '../app/payment.use-case';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('결재 API') // 컨트롤러 태그 설정
@Controller('payments')
export class PaymentController {

  constructor(
    private readonly paymentUsecase: PaymentUsecase
  ) {}

  @Post()
  @ApiOperation({ summary: '결재' })
  @ApiCreatedResponse({
    description: '성공',
    type: ResPostDto,
  })
  pay(
    @Body('userId') userId: string,
    @Body('reservationId') reservationId: string,
    @Body('price') price: string,
  ): Promise<ResPostDto> {
    return this.paymentUsecase.pay(parseInt(userId), parseInt(reservationId), parseInt(price));
  }

}
