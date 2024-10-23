export class ConcertResponseCommand {
    id: number;         // 콘서트seq
    concertId?: number; // 콘서트 ID
    concertSeats?: number[];
    concertDate?: Date; // 콘서트 일정
    concertDates?: Date[];
    capacity?: number;  // 콘서트 정원
    current?:number;    // 콘서트 예약 인원
}