import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('concert')
export class ConcertEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  title: string;  // 콘서트명

  @Column()
  regDate: Date; // 등록일
}
