import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('concert_ticket')
@Unique(['concertPlan', 'seatNum'])
export class ConcertTicketEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  seatNum: number; // 좌석

  @Column()
  concertPlanId: number;  // 콘서트 일정 ID

  @Column()
  userId: number;  // 유저 id

  @Column({default: 'temp'})
  status: string;

  @Column({default: Date.now()})
  regDate: Date;
}
