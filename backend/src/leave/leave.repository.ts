import { Repository } from 'typeorm';
import { Leave } from './leave.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class LeaveRepository extends Repository<Leave> {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
  ) {
    super(leaveRepository.target, leaveRepository.manager, leaveRepository.queryRunner);
  }

  async findByUserId(userId: number): Promise<Leave[]> {
    return this.find({ where: { user: { id: userId } } }); // Use relation syntax
  }
}