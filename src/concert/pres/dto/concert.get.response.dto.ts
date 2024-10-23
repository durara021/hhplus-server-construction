import { ApiProperty } from "@nestjs/swagger";

export class ConcertGetResponseDto {
    @ApiProperty({ description: '공연 번호' })
    id: number;
    @ApiProperty({ description: '공연일정 번호' })
    concertPlanId: number;
    @ApiProperty({ description: '공연 날짜' })
    concertDate?: Date;
    @ApiProperty({ description: '공연 예약 가능 날짜' })
    concertDates?: Date[] | null;
    @ApiProperty({ description: '예약 가능 좌석' })
    concertSeats?: number[] | null;
}
