import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  name: string;  // 예약 종류

  @Column()
  account: number;

  @CreateDateColumn()
  regDate: Date;

}
