import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Leave } from '../leave/leave.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'employee' })
  role: string; // 'employee' or 'admin'

  @OneToMany(() => Leave, (leave) => leave.user) // Added relation to Leave
  leaves: Leave[];
}