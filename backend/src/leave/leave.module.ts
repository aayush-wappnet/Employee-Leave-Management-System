import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Leave } from './leave.entity';

import { LeaveRepository } from './leave.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Leave])],
  providers: [LeaveService, LeaveRepository],
  exports: [LeaveService, LeaveRepository],
  controllers: [LeaveController]
})
export class LeaveModule {}
