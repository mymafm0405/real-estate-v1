import { Component, Input, OnInit } from '@angular/core';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-end-contract',
  templateUrl: './end-contract.component.html',
  styleUrls: ['./end-contract.component.css'],
})
export class EndContractComponent implements OnInit {
  @Input() unit: Unit;
  @Input() currentContract: Contract;
  @Input() currentCustomer: Customer;
  totalContract: number;
  totalPaid: number;
  totalRemaining: number;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    console.log(this.unit);
    this.totalContract =
      this.currentContract.monthPrice * this.currentContract.numOfMonths;
    this.totalPaid = this.buildingsService.getTotalPaidForContract(
      this.currentContract.id
    );
    this.totalRemaining = this.totalContract - this.totalPaid;
  }
}
