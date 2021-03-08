import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-fin-summary',
  templateUrl: './fin-summary.component.html',
  styleUrls: ['./fin-summary.component.css'],
})
export class FinSummaryComponent implements OnInit, OnDestroy {
  unit: Unit;
  contract: Contract;
  customer: Customer;
  employeeId: string = '1';
  paymentStatus: boolean;

  totalContract: number;
  totalPaid: number;
  totalRemaining: number;
  paymentsStatusSub: Subscription;

  paymentClicked = false;

  constructor(
    private route: ActivatedRoute,
    private buildingsService: BuildingsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.unit = this.buildingsService.getCurrentUnit(params.unitId);
      if (this.unit) {
        this.contract = this.buildingsService.getUnitContractByContractId(
          this.unit.contractId
        );
        if (this.contract) {
          this.totalContract =
            this.contract.monthPrice * this.contract.numOfMonths;
          this.totalPaid = this.buildingsService.getTotalPaidForContract(
            this.contract.id
          );
          this.totalRemaining = this.totalContract - this.totalPaid;
          this.customer = this.buildingsService.getCustomer(
            this.contract.customerId
          );
        }
      }

      console.log(this.unit);
      console.log(this.contract);
      console.log(this.customer);
    });
    this.paymentsStatusSub = this.buildingsService.paymentsChanged.subscribe(
      (status: boolean) => {
        this.paymentStatus = status;
        if (this.paymentStatus) {
          this.totalPaid = this.buildingsService.getTotalPaidForContract(
            this.contract.id
          );
          this.totalRemaining = this.totalContract - this.totalPaid;
        }
      }
    );
  }

  onAddPayment() {
    this.paymentClicked = !this.paymentClicked;
  }

  ngOnDestroy() {
    this.paymentsStatusSub.unsubscribe();
  }
}
