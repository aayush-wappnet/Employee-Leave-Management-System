import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { AdminService } from './admin.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, DatePipe],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  leaves: any[] = [];
  displayedColumns: string[] = ['employeeName', 'leaveType', 'startDate', 'endDate', 'approvalStatus', 'actions'];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves() {
    this.adminService.getAllLeaves().subscribe({
      next: (data) => (this.leaves = data),
      error: (err) => console.error(err),
    });
  }

  approveLeave(id: number) {
    this.adminService.updateLeave(id, 'Approved').subscribe({
      next: () => this.loadLeaves(),
      error: (err) => console.error(err),
    });
  }

  rejectLeave(id: number) {
    this.adminService.updateLeave(id, 'Rejected').subscribe({
      next: () => this.loadLeaves(),
      error: (err) => console.error(err),
    });
  }
}