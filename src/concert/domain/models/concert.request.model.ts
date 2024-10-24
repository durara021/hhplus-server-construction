export class ConcertRequestModel {
  concertId: number;
  concertSeats: number[] = [];
  concertDate: string;
  concertPlanId: number;
  capacity: number;

  updateSeats(seats: number[]) {
    this.concertSeats = seats
  }
}
