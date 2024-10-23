import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationPostRequestDto {
  @ApiProperty({ description: '유저 id' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: '카테고리' })
  @IsString()
  category: string;

  @ApiProperty({ description: '카테고리 id' })
  @IsInt()
  categoryId: number;

  @ApiProperty({ description: '아이템 id' })
  @IsInt()
  itemId: number;

  constructor(userId: number, category: string, categoryId: number, itemId: number) {
    this.userId = userId;
    this.category = category;
    this.categoryId = categoryId;
    this.itemId = itemId;
  }
}
