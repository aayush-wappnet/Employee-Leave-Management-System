import { Injectable } from '@angular/core';
import { LeaveService } from '../leave/leave.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private leaveService: LeaveService) {}

  getAllLeaves() {
    return this.leaveService.getAllLeaves();
  }

  updateLeave(id: number, status: string) {
    return this.leaveService.updateLeave(id, status);
  }
}