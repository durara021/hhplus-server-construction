import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Unique(['uuid'])
@Entity('session')
export class SessionEntity {

  @PrimaryGeneratedColumn()
  id: number;  // 자동 증가로 대기열 순번 역할 수행

  @Column()
  uuid: string;

  @Column()
  userId: number;

  @Column()
  status: string;

  @CreateDateColumn({default: Date.now()})
  regDate: number;

}
