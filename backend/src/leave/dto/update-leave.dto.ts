import { IsEnum } from 'class-validator';

export class UpdateLeaveDto {
  @IsEnum(['Pending', 'Approved', 'Rejected'])
  approvalStatus: string;
}