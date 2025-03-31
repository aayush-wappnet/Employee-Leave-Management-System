import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  employeeName: string;

  @Column({ type: 'enum', enum: ['Sick Leave', 'Casual Leave', 'Earned Leave'] })
  leaveType: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'enum', enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' })
  approvalStatus: string;

  @ManyToOne(() => User, (user) => user.leaves, { eager: false, onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'userId' }) // This defines userId as the foreign key column
  user: User;
}