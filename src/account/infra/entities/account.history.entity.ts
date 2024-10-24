import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('accountHistory')
export class AccountHistoryEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  userId: number;  // 계좌 소유자

  @Column()
  amount: number; // 충전하는 point 양

  @Column()
  stat: string; // 충전/사용 구분

  @CreateDateColumn()
  regDate: Date; // 등록일
}
