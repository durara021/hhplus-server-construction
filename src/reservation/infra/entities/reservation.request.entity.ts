export class ReservationRequestEntity {
  id: number;  // 자동 증가로 대기열 순번 역할 수행
  ids: number[];
  mainCateg: number; // 예약 종류( 콘서트, 숙박 등 id )
  subCateg: number; // 예약 종류( 콘서트 일정, 숙박시설 등 id )
  minorCateg: number // 예약 종류( 콘서트 자리, 숙박시설 호실 등 id)
  status: string; // 예약 상태 = 임시/확정/취소
}
