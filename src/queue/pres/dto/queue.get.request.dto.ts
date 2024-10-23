import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueueGetRequestDto {
  @ApiProperty({ description: '유저 id' })
  @IsInt()
  userId: number;
}