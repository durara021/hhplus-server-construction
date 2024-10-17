import { ApiProperty } from "@nestjs/swagger";

export class PaymentPostResponseDto {
    @ApiProperty({ description: '유저 id' })
    userId: number;
    @ApiProperty({ description: '예약 id' })
    reservationId: number;
    @ApiProperty({ description: '등록일' })
    regDate: Date;
    constructor(
        userId: number,
        reservationId: number,
        regDate: Date,
    ) {
        this.userId = userId;
        this.reservationId = reservationId;
        this.regDate = regDate;
    }
}
