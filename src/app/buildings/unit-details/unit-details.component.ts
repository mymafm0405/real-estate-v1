import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css'],
})
export class UnitDetailsComponent implements OnInit {
  parentId: string;
  unitId: string;
  currentUnit: Unit;
  currentBuilding: Building;
  currentContract: Contract;
  currentCustomer: Customer;
  newContractClicked = false;
  viewClicked = false;
  viewFinancial = false;
  endContract = false;

  constructor(
    private route: ActivatedRoute,
    private buildingsService: BuildingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.parentId = params.id;
      this.unitId = params.unitId;
    });
    this.checkUnit();
    this.getBuilding();
    this.getContract();
    this.getCustomer();
  }

  getBuilding() {
    this.currentBuilding = this.buildingsService.getBuilding(this.parentId);
  }

  checkUnit() {
    const foundUnit = this.buildingsService.getCurrentUnit(this.unitId);
    foundUnit ? (this.currentUnit = foundUnit) : this.router.navigate(['../']);
  }
  getContract() {
    if (this.currentUnit.contractId !== '') {
      this.currentContract = this.buildingsService.getUnitContract(
        this.currentUnit.id
      );
    }
  }
  getCustomer() {
    if (this.currentContract) {
      this.currentCustomer = this.buildingsService.getCustomer(
        this.currentContract.customerId
      );
    }
  }

  onNewContract() {
    this.newContractClicked = !this.newContractClicked;
  }

  onViewContract() {
    this.viewClicked = !this.viewClicked;
    this.viewFinancial = false;
    this.endContract = false;
  }

  onViewFinancial() {
    this.viewFinancial = !this.viewFinancial;
    this.viewClicked = false;
    this.endContract = false;
  }

  onEndContract() {
    this.endContract = !this.endContract;
    this.viewClicked = false;
    this.viewFinancial = false;
  }

  onCancel() {
    this.endContract = false;
  }
}
