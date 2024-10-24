export class ConcertResponseModel {
    id: number ;         // 콘서트seq
    concertId: number ; // 콘서트 ID
    concertDate: Date ; // 콘서트 일정
    concertDates: Date[] = [] ;
    concertSeats: number[] = [] ;
    capacity: number ;  // 콘서트 정원
    current:number ;    // 콘서트 예약 인원

    updateConcertDates(newConcertDates: Date[]){
        this.concertDates = newConcertDates;
    }
    
}