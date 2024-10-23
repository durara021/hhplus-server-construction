import { IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConcertGetRequestDto {
  @ApiProperty({ description: '콘서트 id' })
  @IsInt()
  concertId: number;
  
  @ApiProperty({ description: '콘서트 날짜' })
  @IsDateString()
  concertDate?: string;

}

