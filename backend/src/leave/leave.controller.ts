import { Controller, Post, Body, Get, Patch, Param, UseGuards, Request, Logger } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';

// Define the type for the JWT payload
interface JwtUser {
  userId: number;
  email: string;
  role: string;
}

@Controller('leave')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  private readonly logger = new Logger(LeaveController.name);

  constructor(private leaveService: LeaveService) {}

  @Post()
  create(@Body() createLeaveDto: CreateLeaveDto, @Request() req: { user: JwtUser }) {
    this.logger.log(`POST /api/leave called with data: ${JSON.stringify(createLeaveDto)} by user: ${req.user.userId}`);
    return this.leaveService.createLeave(createLeaveDto, req.user);
  }

  @Get()
  getLeaves(@Request() req: { user: JwtUser }) {
    this.logger.log(`GET /api/leave called by user: ${req.user.userId} with role: ${req.user.role}`);
    return this.leaveService.getLeaves(req.user);
  }

  @Get('all')
  getAllLeaves(@Request() req: { user: JwtUser }) {
    this.logger.log(`GET /api/leave/all called by user: ${req.user.userId} with role: ${req.user.role}`);
    return this.leaveService.getAllLeaves(req.user);
  }

  @Patch('all/:id')
  update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto, @Request() req: { user: JwtUser }) {
    this.logger.log(`PATCH /api/leave/${id} called with data: ${JSON.stringify(updateLeaveDto)} by user: ${req.user.userId}`);
    return this.leaveService.updateLeave(+id, updateLeaveDto, req.user);
  }
}