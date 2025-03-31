import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LeaveApplyComponent } from './leave/leave-apply.component';
import { LeaveDashboardComponent } from './leave/leave-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'leave/apply', component: LeaveApplyComponent, canActivate: [AuthGuard] },
  { path: 'leave/dashboard', component: LeaveDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];