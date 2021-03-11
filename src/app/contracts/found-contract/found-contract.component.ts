import { Component, Input, OnInit } from '@angular/core';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-found-contract',
  templateUrl: './found-contract.component.html',
  styleUrls: ['./found-contract.component.css'],
})
export class FoundContractComponent implements OnInit {
  @Input() contract: Contract;
  customer: Customer;
  remaining: number;
  building: Building;
  unit: Unit;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    if (this.contract) {
      this.customer = this.buildingsService.getCustomer(
        this.contract.customerId
      );
      this.getRemaining();
      this.building = this.buildingsService.getBuilding(
        this.contract.buildingId
      );
      this.unit = this.buildingsService.getCurrentUnit(this.contract.unitId);
    }
  }

  getRemaining() {
    this.remaining =
      this.contract.monthPrice * this.contract.numOfMonths -
      this.buildingsService.getTotalPaidForContract(this.contract.id);
  }
}
