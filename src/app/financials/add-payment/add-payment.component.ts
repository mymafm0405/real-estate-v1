import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Payment } from 'src/app/shared/payment.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css'],
})
export class AddPaymentComponent implements OnInit {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  unit: Unit;
  contract: Contract;
  customer: Customer;
  employeeId: string = '1';
  paymentStatus: boolean;

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
          this.customer = this.buildingsService.getCustomer(
            this.contract.customerId
          );
        }
      }

      console.log(this.unit);
      console.log(this.contract);
      console.log(this.customer);
    });
  }

  onSubmit() {
    const formValues = this.addForm.value;
    const newPayment: Payment = new Payment(
      this.contract.id,
      formValues.amount,
      formValues.date,
      formValues.details,
      this.employeeId
    );
    this.buildingsService.addPayment(newPayment);
  }
}
