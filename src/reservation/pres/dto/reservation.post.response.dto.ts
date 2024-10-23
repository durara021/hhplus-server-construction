import { ApiProperty } from "@nestjs/swagger";

export class ReservationPostResponseDto {
    @ApiProperty({ description: '예약 구분' })
    mainCateg: number;
    @ApiProperty({ description: '예약 대분류 id' })
    subCateg: number;
    @ApiProperty({ description: '예약 소분류 id' })
    minorCateg: number;
    @ApiProperty({ description: '예약자' })
    userId: number;
    @ApiProperty({ description: '등록일' })
    regDate: Date;
    @ApiProperty({ description: '예약상태' })
    status: string;
    @ApiProperty({ description: '수정일' })
    modDate: Date | null;
}
