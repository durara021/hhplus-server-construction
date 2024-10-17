import { ApiProperty } from "@nestjs/swagger";

export class ReservationPostResponseDto {
    @ApiProperty({ description: '예약 구분' })
    category: string;
    @ApiProperty({ description: '예약 대분류 id' })
    categoryId: number;
    @ApiProperty({ description: '예약 소분류 id' })
    itemId: number;
    @ApiProperty({ description: '예약자' })
    userId: number;
    @ApiProperty({ description: '등록일' })
    regDate: Date;
    @ApiProperty({ description: '예약상태' })
    status: string;
    @ApiProperty({ description: '수정일' })
    modDate: Date | null;

    constructor(
        category: string,
        categoryId: number,
        itemId: number,
        userId: number,
        regDate: Date,
        status: string,
        modDate: Date | null,
    ) {
        this.category = category;
        this.categoryId = categoryId;
        this.itemId = itemId;
        this.userId = userId;
        this.regDate = regDate;
        this.status = status;
        this.modDate = modDate;
    }
}
