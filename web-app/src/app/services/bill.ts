import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Bill } from '../models/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private http = inject(HttpClient);
  private api = environment.billingUrl;

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(this.api);
  }

  getBill(id: number): Observable<Bill> {
    return this.http.get<Bill>(`${this.api}/${id}`);
  }

  createBill(bill: Bill): Observable<Bill> {
    return this.http.post<Bill>(this.api, bill);
  }

  updateBill(id: number, bill: Bill): Observable<Bill> {
    return this.http.put<Bill>(`${this.api}/${id}`, bill);
  }

  deleteBill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}