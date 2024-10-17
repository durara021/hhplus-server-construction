import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('concert_plan')
export class ConcertPlanEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  concertId: number;  // 콘서트 ID

  @Column()
  concertDate: Date;  // 콘서트 일정

  @Column()
  capacity: number; // 콘서트 정원

  @Column()
  current:number; // 콘서트 예약 인원
  
}
