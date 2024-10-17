import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity('concert')
@Unique(['category','categoryId', 'itemId'])
export class ReservationEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  category: string;  // 예약 종류

  @Column()
  categoryId: number; // 예약종류 대분류id(ex 콘서트 - 콘서트 planId, 숙박 - 숙박 업소id)

  @Column()
  itemId: number // 해당 예약별 객체id(ex 콘서트 - 티켓id, 숙박 - 호실)

  @Column()
  userId: number; // 예약자 id

  @CreateDateColumn()
  regDate: Date; // 최초 예약일

  @Column({default: 'temp'})
  status: string; // 예약 상태 = 임시/확정/취소

  @UpdateDateColumn()
  modDate: Date; // 상태 변경일
}
