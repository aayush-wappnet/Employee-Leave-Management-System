import { Controller, Post, Body, Get, Patch, Param, UseGuards, Request, Logger } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  private readonly logger = new Logger(LeaveController.name);

  constructor(private leaveService: LeaveService) {}

  @Post()
  create(@Body() createLeaveDto: CreateLeaveDto, @Request() req) {
    this.logger.log(`POST /api/leave called with data: ${JSON.stringify(createLeaveDto)} by user: ${req.user.id}`);
    return this.leaveService.createLeave(createLeaveDto, req.user);
  }

  @Get()
  getLeaves(@Request() req) {
    this.logger.log(`GET /api/leave called by user: ${req.user.id}`);
    return this.leaveService.getLeaves(req.user);
  }

  @Get('all')
  getAllLeaves(@Request() req) {
    this.logger.log(`GET /api/leave/all called by user: ${req.user.id}`);
    return this.leaveService.getAllLeaves(req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto, @Request() req) {
    this.logger.log(`PATCH /api/leave/${id} called with data: ${JSON.stringify(updateLeaveDto)} by user: ${req.user.id}`);
    return this.leaveService.updateLeave(+id, updateLeaveDto, req.user);
  }
}