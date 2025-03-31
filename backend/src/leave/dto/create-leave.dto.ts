import { IsString, MaxLength, IsEnum, IsDateString } from 'class-validator';

export class CreateLeaveDto {
  @IsString()
  @MaxLength(100)
  employeeName: string;

  @IsEnum(['Sick Leave', 'Casual Leave', 'Earned Leave'])
  leaveType: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;
}