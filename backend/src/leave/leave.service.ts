import { Injectable, ForbiddenException, Logger } from '@nestjs/common';
import { LeaveRepository } from './leave.repository';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Leave } from './leave.entity';
import { User } from '../user/user.entity';

// Define the type for the JWT payload
interface JwtUser {
  userId: number;
  email: string;
  role: string;
}

@Injectable()
export class LeaveService {
  private readonly logger = new Logger(LeaveService.name);

  constructor(private leaveRepository: LeaveRepository) {}

  async createLeave(createLeaveDto: CreateLeaveDto, user: JwtUser): Promise<Leave> {
    this.logger.log(`Creating leave for user ${user.userId} with role ${user.role}, data: ${JSON.stringify(createLeaveDto)}`);

    const leave = this.leaveRepository.create({
      employeeName: createLeaveDto.employeeName,
      leaveType: createLeaveDto.leaveType,
      startDate: new Date(createLeaveDto.startDate),
      endDate: new Date(createLeaveDto.endDate),
      approvalStatus: 'Pending',
      user: { id: user.userId } as User, // Map userId from JWT to User entity's id
    });

    try {
      const savedLeave = await this.leaveRepository.save(leave);
      this.logger.log(`Leave created with ID: ${savedLeave.id}, userId: ${savedLeave.user.id}`);
      return savedLeave;
    } catch (error) {
      this.logger.error(`Error saving leave: ${error.message}`, error.stack);
      throw error;
    }
  }

  async getLeaves(user: JwtUser): Promise<Leave[]> {
    this.logger.log(`Fetching leaves for user ${user.userId} with role ${user.role}`);
    return this.leaveRepository.find({ where: { user: { id: user.userId } } });
  }

  async getAllLeaves(user: JwtUser): Promise<Leave[]> {
    this.logger.log(`Fetching all leaves requested by user ${user.userId} with role ${user.role}`);
    if (user.role !== 'admin') {
      throw new ForbiddenException('Only admins can view all leaves');
    }
    return this.leaveRepository.find();
  }

  async updateLeave(id: number, updateLeaveDto: UpdateLeaveDto, user: JwtUser): Promise<Leave> {
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