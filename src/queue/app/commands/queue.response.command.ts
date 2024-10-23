export class QueueResponseCommand {
  id: number;  // 자동 증가로 대기열 순번 역할 수행
  userId: number;  // 사용자 ID
  uuid: string;  // 세션 식별을 위한 UUID
  status: string;
  createdAt: Date;  // 생성 시간
  updatedAt: Date;  // 수정 시간
}
