export class QueueSchedulerEntity {
    ids: number[] | null;      // 상태변경할 id 배열
    capacity: number;   // 한번에 상태변경할 유저 값
    status: string;     // 변경할 상태
    modDate: Date;
}
