import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';

interface FormsValues {
  name: string;
  qid: number;
  passport: string;
  phone: number;
  date: string;
  price: number;
  monthsAmount: number;
}
@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.css'],
})
export class ContractFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  unitUpdateSub: Subscription;
  addingContractStatus: boolean;
  submitted = false;
  buildingId: string;
  unitId: string;

  constructor(
    private buildingsService: BuildingsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.buildingId = params.id;
      this.unitId = params.unitId;
    });

    this.unitUpdateSub = this.buildingsService.unitUpdateStatus.subscribe(
      (status: boolean) => {
        this.submitted = true;
        this.addingContractStatus = status;
        this.addForm.reset();
        setTimeout(() => {
          this.submitted = false;
          this.router.navigate(['../']);
        }, 2000);
      }
    );
  }

  onSubmit() {
    const formValues: FormsValues = this.addForm.value;
    const newContract: Contract = new Contract(
      1,
      this.buildingId,
      this.unitId,
      formValues.date,
      formValues.price,
      formValues.monthsAmount
    );
    this.buildingsService.addContract(newContract);
  }

  ngOnDestroy() {
    this.unitUpdateSub.unsubscribe();
  }
}
