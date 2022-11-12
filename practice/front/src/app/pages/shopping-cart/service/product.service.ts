import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${environment.BASE_URL}/products`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(
      `${environment.BASE_URL}/${productId}/products`
    );
  }

  editProduct(productId: number, product: any): Observable<any> {
    return this.http.put<any>(
      `${environment.BASE_URL}/${productId}/products`,
      product
    );
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/products`, product);
  }
}
