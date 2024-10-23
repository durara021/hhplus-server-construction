import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaymentPostRequestDto {
  @ApiProperty({ description: '유저 id' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: '예약 id' })
  @IsInt()
  reservationId: number;

  @ApiProperty({ description: '가격' })
  @IsInt()
  price: number;
}