import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payments} from '../../@models/interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public updatePayment(payment: Payments): void {
    // this.http
    //   .put<Payments>(`https://localhost:5000/api/payment`, payment)
    //   .toPromise()
    //   .then()
    //   .catch(msg => console.log(msg))
  }
}
