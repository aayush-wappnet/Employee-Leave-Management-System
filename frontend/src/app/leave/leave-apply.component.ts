import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { LeaveService } from './leave.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-apply',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule, // Import MatIconModule for Datepicker Toggle Icon
  ],
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.scss'],
})
export class LeaveApplyComponent implements OnInit {
  leaveForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private leaveService: LeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      employeeName: ['', [Validators.required, Validators.maxLength(100)]],
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.leaveForm.valid) {
      this.leaveService.applyLeave(this.leaveForm.value).subscribe({
        next: () => this.router.navigate(['/leave/dashboard']),
        error: (err) => console.error(err),
      });
    }
  }
}
