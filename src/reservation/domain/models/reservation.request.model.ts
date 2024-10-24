export class ReservationRequestModel {
    id: number;                  // 예약 ID
    ids: number;
    userId: number;              // 사용자 ID
    mainCateg: number;           // 대분류
    subCateg: number;            // 중분류
    minorCateg: number;          // 소분류
    status: string;              // 예약 상태
      
    updateStatus(newStatus: string) {
        this.status = newStatus;
    }
}
  