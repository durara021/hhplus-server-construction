export class ReservationSchedulerEntity {
    ids: number[] | null;      // 상태변경할 id 배열
    status: string;     // 변경할 상태
    modDate: Date;
}
