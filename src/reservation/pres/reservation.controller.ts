import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReservationUsecase } from '../app/reservation.use-case';
import { ReservationPostResponseDto as ResPostDto} from './dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('예약 API') // 컨트롤러 태그 설정
@Controller('reservations')
export class ReservationController {
  
  constructor(
    private readonly reservationUsecase: ReservationUsecase
  ) {}

  @Post('')
  @ApiOperation({ summary: '예약' })
  @ApiCreatedResponse({
    description: '성공',
    type: ResPostDto,
  })
  reserve(
    @Body('userId') userId: string,
    @Body('category') category: string,
    @Body('categoryId') categoryId: string,
    @Body('itemId') itemId: string,
  ): Promise<ResPostDto> {
    return this.reservationUsecase.reserve(category, parseInt(categoryId), parseInt(itemId), parseInt(userId));
  }

}
