import { Injectable } from '@angular/core';
import {Payments} from '../../@models/interface';
import {Observable, ReplaySubject} from 'rxjs';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private paymentsRegistry: Payments[] = [];
  private payments: ReplaySubject<Payments[]> = new ReplaySubject<Payments[]>(1);
  public payments$: Observable<Payments[]> = this.payments.asObservable();

  constructor(private apiService: ApiService) { }

  public addPayment(payment: Payments): void {
    this.paymentsRegistry.push(payment);
    this.payments.next(this.paymentsRegistry);
    this.apiService.updatePayment(payment);
  }
}
