import { Controller, Post, Body } from '@nestjs/common';
import { PaymentPostResponseDto as ResPostDto } from './dto';
import { PaymentUsecase } from '../app/payment.use-case';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentPostRequestDto } from './dto/payment.post.request.dto';
import { ObjectMapper } from 'src/common/mapper/object-mapper';
import { PaymentRequestCommand } from '../app/commands';

@ApiTags('결재 API') // 컨트롤러 태그 설정
@Controller('payments')
export class PaymentController {

  constructor(
    private readonly paymentUsecase: PaymentUsecase,
    private readonly objectMapper: ObjectMapper
  ) {}

  @Post()
  @ApiOperation({ summary: '결재' })
  @ApiCreatedResponse({
    description: '성공',
    type: ResPostDto,
  })
  pay(
    @Body() body: PaymentPostRequestDto
  ): Promise<ResPostDto> {
    return this.paymentUsecase.pay(this.objectMapper.mapObject(body, PaymentRequestCommand));
  }

}
