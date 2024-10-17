import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('session')
export class SessionEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  uuid: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  regDate: Date;

}
