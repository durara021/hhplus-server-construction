import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueuePostRequestDto {
  @ApiProperty({ description: '유저 id' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: '세션 UUID' })
  @IsString()
  uuid: string;
}
