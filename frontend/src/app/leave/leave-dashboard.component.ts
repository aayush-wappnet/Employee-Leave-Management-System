import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { LeaveService } from './leave.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-leave-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, DatePipe],
  templateUrl: './leave-dashboard.component.html',
  styleUrls: ['./leave-dashboard.component.scss'],
})
export class LeaveDashboardComponent implements OnInit {
  leaves: any[] = [];
  displayedColumns: string[] = ['employeeName', 'leaveType', 'startDate', 'endDate', 'approvalStatus'];

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.leaveService.getLeaves().subscribe({
      next: (data) => (this.leaves = data),
      error: (err) => console.error(err),
    });
  }
}