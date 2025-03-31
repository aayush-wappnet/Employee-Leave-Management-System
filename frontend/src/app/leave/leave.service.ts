import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private apiUrl = 'http://localhost:8000/api/leave';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }

  applyLeave(leave: any): Observable<any> {
    return this.http.post(this.apiUrl, leave, { headers: this.getHeaders() });
  }

  getLeaves(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  getAllLeaves(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  updateLeave(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { approvalStatus: status }, { headers: this.getHeaders() });
  }
}