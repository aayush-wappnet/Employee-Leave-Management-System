import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { LeaveRepository } from './leave.repository';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './leave.entity';
import { User } from '../user/user.entity';

@Injectable()
export class LeaveService {
  private readonly logger = new Logger(LeaveService.name);

  constructor(private leaveRepository: LeaveRepository) {}

  async createLeave(createLeaveDto: CreateLeaveDto, user: User): Promise<Leave> {
    this.logger.log(`Creating leave for user ${user.id} with data: ${JSON.stringify(createLeaveDto)}`);

    const leave = this.leaveRepository.create({
      employeeName: createLeaveDto.employeeName,
      leaveType: createLeaveDto.leaveType,
      startDate: new Date(createLeaveDto.startDate),
      endDate: new Date(createLeaveDto.endDate),
      approvalStatus: 'Pending',
      user, // Set the user relation directly
    });

    try {
      const savedLeave = await this.leaveRepository.save(leave, { reload: false });
      this.logger.log(`Leave created with ID: ${savedLeave.id}, userId: ${savedLeave.user.id}`);
      return savedLeave;
    } catch (error) {
      this.logger.error(`Error saving leave: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getLeaves(user: User): Promise<Leave[]> {
    return this.leaveRepository.findByUserId(user.id);
  }

  async getAllLeaves(user: User): Promise<Leave[]> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can view all leaves');
    }
    return this.leaveRepository.find();
  }

  async updateLeave(id: number, updateLeaveDto: UpdateLeaveDto, user: User): Promise<Leave> {
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can update leave status');
    }

    this.logger.log(`Updating leave ID ${id} with data: ${JSON.stringify(updateLeaveDto)}`);

    if (!updateLeaveDto || !updateLeaveDto.approvalStatus) {
      this.logger.error('UpdateLeaveDto is empty or missing approvalStatus');
      throw new Error('Approval status is required for update');
    }

    const result = await this.leaveRepository
      .createQueryBuilder()
      .update(Leave)
      .set({ approvalStatus: updateLeaveDto.approvalStatus })
      .where('id = :id', { id })
      .execute();

    this.logger.log(`Update result: ${JSON.stringify(result)}`);

    const updatedLeave = await this.leaveRepository.findOneOrFail({ where: { id } });
    this.logger.log(`Updated leave: ${JSON.stringify(updatedLeave)}`);
    return updatedLeave;
  }
}