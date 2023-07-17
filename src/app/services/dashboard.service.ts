import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ChartData {
  name: string;
  value: number;
}

interface User {
  firstName: string;
  lastName: string;
  username: string;
}

export interface DashboardData {
  chartDonut: ChartData[];
  chartBar: ChartData[];
  tableUsers: User[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://test-demo.aemenersol.com/api/dashboard';

  constructor(private http: HttpClient) {}
  getDashboardData() {
    return this.http.get<DashboardData>(this.apiUrl);
  }
}
