import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationPostRequestDto {
  @ApiProperty({ description: '유저 id' })
  @IsInt()
  mainCateg: number;

  @ApiProperty({ description: '예약 대분류 id' })
  @IsInt()
  subCateg: number;

  @ApiProperty({ description: '예약 소분류 id' })
  @IsInt()
  minorCateg: number;
  
  @ApiProperty({ description: '예약자' })
  @IsInt()
  userId: number;
}
