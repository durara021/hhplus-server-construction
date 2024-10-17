import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('queue')
export class QueueEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  userId: number;  // 사용자 ID

  @Column()
  uuid: string;  // 세션 식별을 위한 UUID

  @Index()
  @Column()
  status: string;

  @CreateDateColumn()
  createdAt: Date;  // 생성 시간

  @UpdateDateColumn()
  updatedAt: Date;  // 수정 시간

}
