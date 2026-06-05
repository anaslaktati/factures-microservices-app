import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { HalResponse } from '../models/hal-response';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient);
  private api = environment.customerUrl;

  getCustomers(): Observable<HalResponse<Customer>> {
    return this.http.get<HalResponse<Customer>>(this.api);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.api}/${id}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.api, customer);
  }

  updateCustomer(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.api}/${id}`, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}