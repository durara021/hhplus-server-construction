export class AccountResponseCommand {
    id: number;       // 순번
    userId: number;   // 계좌 소유자
    balance: number; // 총액
    amount: number;  // 충전하는 point 양
    stat: string;    // 충전/사용 구분
    regDate: Date = new Date;   // 등록일
  }
  