import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-unit-icon',
  templateUrl: './unit-icon.component.html',
  styleUrls: ['./unit-icon.component.css'],
})
export class UnitIconComponent implements OnInit, OnDestroy {
  @Input() unit: Unit;
  customer: Customer;
  contract: Contract;
  // getContractStatusSub: Subscription;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    // this.getContractStatusSub = this.buildingsService.contractGetStatus.subscribe(
    //   (status: boolean) => {
    //     if (status) {
    //       this.customer = this.buildingsService.getCustomer(
    //         this.contract.customerId
    //       );
    //       console.log(this.customer);
    //     }
    //     console.log(this.customer);
    //   }
    // );
    if (this.unit.contractId) {
      console.log(this.unit.contractId);
      this.contract = this.buildingsService.getUnitContractByContractId(
        this.unit.contractId
      );
      this.customer = this.buildingsService.getCustomer(
        this.contract.customerId
      );
    }
  }

  ngOnDestroy() {
    // this.getContractStatusSub.unsubscribe();
  }
}
