import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('event_logs')
export class EventLogEntity {
  @PrimaryGeneratedColumn()
  id: number; // 이벤트 로그의 고유 ID

  @Column()
  eventType: string; // 이벤트의 유형 (예: 'reserve.concert')

  @Column('jsonb')
  payload: Record<string, any>; // 이벤트와 관련된 데이터, JSON 형태로 저장

  @Column({ default: 'pending' })
  status: string; // 이벤트 상태 ('pending', 'processed', 'failed' 등)

  @CreateDateColumn()
  createdAt: Date; // 이벤트 발생 시점

  @UpdateDateColumn()
  processedAt: Date; // 이벤트 처리 완료 시점 (처리 후 업데이트)
}
