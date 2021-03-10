import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-end-contract',
  templateUrl: './end-contract.component.html',
  styleUrls: ['./end-contract.component.css'],
})
export class EndContractComponent implements OnInit, OnDestroy {
  @Input() unit: Unit;
  @Input() currentContract: Contract;
  @Input() currentCustomer: Customer;
  totalContract: number;
  totalPaid: number;
  totalRemaining: number;
  endStatusSub: Subscription;
  endStatus: boolean;
  inProgress = false;
  submitted = false;

  constructor(
    private buildingsService: BuildingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.endStatusSub = this.buildingsService.endStatusChanges.subscribe(
      (status: boolean) => {
        this.endStatus = status;
        if (this.endStatus) {
          setTimeout(() => {
            this.router.navigate(['../', 'building', this.unit.parentId]);
          }, 2000);
        } else {
          setTimeout(() => {
            this.inProgress = false;
            this.inProgress = false;
          }, 2000);
        }
      }
    );

    console.log(this.unit);
    this.totalContract =
      this.currentContract.monthPrice * this.currentContract.numOfMonths;
    this.totalPaid = this.buildingsService.getTotalPaidForContract(
      this.currentContract.id
    );
    this.totalRemaining = this.totalContract - this.totalPaid;
  }

  onConfirm() {
    this.submitted = true;
    this.inProgress = true;
    this.buildingsService.endContract(this.currentContract.id, this.unit.id);
  }

  ngOnDestroy() {
    this.endStatusSub.unsubscribe();
  }
}
