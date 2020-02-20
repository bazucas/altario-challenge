import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {GeneratorService} from '../../../@core/services/generator.service';
import {PaymentsService} from '../../../@core/services/payments.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Payments} from '../../../@models/interface';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();
  private grid: string[][] = [];
  private code = '';

  public contactForm: FormGroup;
  public disabled = false;

  constructor(
    public generatorService: GeneratorService,
    public paymentsService: PaymentsService) { }

  public ngOnInit(): void {
    this.generatorService.grid$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(grid => {
        this.grid = grid;
      });
    this.generatorService.occurrences$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(code => {
        this.code = code;
      });
    this.contactForm = this.createFormGroup();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public createFormGroup(): FormGroup {
    return new FormGroup({
      payment: new FormControl(),
      amount: new FormControl()
    });
  }

  public incrementPay(): void {
    if (!this.grid) { return; }
    const pay: Payments = {
      name: this.contactForm.value.payment,
      amount: this.contactForm.value.amount,
      code: this.code,
      grid: this.grid
    };
    this.paymentsService.addPayment(pay);
    this.disableButton();
  }

  public trackByFn(index: number) {
    return index;
  }

  private disableButton(): void {
    this.disabled = true;
    // prevents user creating several payments with the same code and grid
    setTimeout(() => this.disabled = false, 2000);
  }
}
