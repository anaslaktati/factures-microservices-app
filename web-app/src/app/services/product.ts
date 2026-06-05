import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { HalResponse } from '../models/hal-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private api = environment.productUrl;

  getProducts(): Observable<HalResponse<Product>> {
    return this.http.get<HalResponse<Product>>(this.api);
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.api}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.api, product);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.api}/${id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}