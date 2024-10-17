import { ApiProperty } from "@nestjs/swagger";

export class ConcertGetResponseDto {
    @ApiProperty({ description: '공연 이름' })
    title: string | null;
    @ApiProperty({ description: '공연 날짜' })
    concertDate: Date;
    @ApiProperty({ description: '공연 예약 가능 날짜' })
    availableDates: Date[] | null;
    @ApiProperty({ description: '예약 가능 좌석' })
    availableSeats: number[] | null;

    constructor(
        title: string,
        concertDate: Date,
        availableDates: Date[] | null,
        availableSeats: number[] | null,
    ) {
        this.title = title;
        this.concertDate = concertDate;
        this.availableDates = availableDates;
        this.availableSeats = availableSeats;
    }
}
