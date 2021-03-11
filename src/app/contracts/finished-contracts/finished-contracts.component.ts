import { Component, OnInit } from '@angular/core';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';

interface FinishedContract {
  name: string;
  phone: number;
  qId: number;
  building: string;
  unit: string;
  endDate: string;
  remaining: number;
}

@Component({
  selector: 'app-finished-contracts',
  templateUrl: './finished-contracts.component.html',
  styleUrls: ['./finished-contracts.component.css'],
})
export class FinishedContractsComponent implements OnInit {
  finishedContracts: Contract[] = [];
  finalContracts: FinishedContract[] = [];
  customer: Customer;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.finishedContracts = this.buildingsService.getFinishedContracts();
    if (this.finishedContracts.length > 0) {
      this.loadFoundContracts();
    }
  }

  loadFoundContracts() {
    for (const contract of this.finishedContracts) {
      const customer = this.buildingsService.getCustomer(contract.customerId);
      const building = this.buildingsService.getBuilding(contract.buildingId);
      const unit = this.buildingsService.getCurrentUnit(contract.unitId);
      const remaining =
        contract.monthPrice * contract.numOfMonths -
        this.buildingsService.getTotalPaidForContract(contract.id);
      const finalContract: FinishedContract = {
        name: customer.name,
        phone: customer.phone,
        qId: customer.qId,
        building: building.name,
        unit: unit.name,
        endDate: 'DateOfEnd',
        remaining: remaining,
      };
      this.finalContracts.push(finalContract);
    }
  }
}
