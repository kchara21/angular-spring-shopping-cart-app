import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleService {
  constructor(private http: HttpClient) {}

  createSale(client: any): Observable<any> {
    return this.http.post(`${environment.BASE_URL}/sales`, client);
  }
}
