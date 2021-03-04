import { Component, OnInit, Input } from '@angular/core';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-unit-icon',
  templateUrl: './unit-icon.component.html',
  styleUrls: ['./unit-icon.component.css'],
})
export class UnitIconComponent implements OnInit {
  @Input() unit: Unit;
  customer: Customer;
  contract: Contract;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    if (this.unit.contractId) {
      this.contract = this.buildingsService.getUnitContract(
        this.unit.contractId
      );
      // this.customer = this.buildingsService.getCustomer(
      //   this.contract.customerId
      // );
    }
  }
}
