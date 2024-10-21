import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, Unique } from 'typeorm';

@Entity('concert')
@Unique(['category','categoryId', 'itemId'])
export class ReservationEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  mainCateg: number; // 예약 종류( 콘서트, 숙박 등 id )

  @Column()
  subCateg: number; // 예약 종류( 콘서트 일정, 숙박시설 등 id )

  @Column()
  minorCateg: number // 예약 종류( 콘서트 자리, 숙박시설 호실 등 id)

  @Column()
  userId: number; // 예약자 id

  @CreateDateColumn()
  regDate: Date; // 최초 예약일

  @Column({default: 'temp'})
  status: string; // 예약 상태 = 임시/확정/취소

  @UpdateDateColumn()
  modDate: Date; // 상태 변경일
}
