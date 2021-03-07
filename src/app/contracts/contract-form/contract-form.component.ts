import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';
import { Customer } from 'src/app/shared/customer.model';

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
  msgFoundCustomer = false;
  confirmed = false;
  formValues: FormsValues;
  customerId: string;
  newContract: Contract;
  inProgress = false;

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
          this.router.navigate(['building', this.buildingId]);
        }, 2000);
      }
    );
  }

  onSubmit() {
    this.formValues = this.addForm.value;
    this.newContract = new Contract(
      this.buildingId,
      this.unitId,
      this.formValues.date,
      this.formValues.price,
      this.formValues.monthsAmount
    );
    const foundCustomer = this.buildingsService.checkCustomer(
      this.formValues.qid,
      this.formValues.phone
    );
    console.log(foundCustomer);
    if (foundCustomer && !this.msgFoundCustomer && !this.confirmed) {
      this.customerId = foundCustomer.id;
      // The next function not useful yet, we have to display the found contracts
      this.buildingsService.getContractsForCustomer(this.customerId);
      // end
      this.msgFoundCustomer = true;
      console.log('we have found other contracts to same customer!');
      console.log(this.customerId);
      return;
    }
    if (this.confirmed) {
      this.inProgress = true;
      console.log('what happened! 2');
      this.addNewCont(this.newContract);
      console.log('we have confirmed to add this contract!');
    }
    if (!foundCustomer && !this.msgFoundCustomer) {
      this.addNewCustomerAndNewCont();
      console.log(
        'we did not find any contracts to the same customer, so we added it'
      );
    }
  }

  onConfirm() {
    this.confirmed = true;
  }

  onCancel() {
    this.msgFoundCustomer = false;
    this.addForm.reset();
  }

  addNewCont(newCont: Contract) {
    console.log('what happened! 1');
    this.buildingsService.addContract({
      ...newCont,
      customerId: this.customerId,
    });
  }

  addNewCustomerAndNewCont() {
    this.inProgress = true;
    const newCustomer = new Customer(
      this.formValues.name,
      this.formValues.qid,
      this.formValues.phone,
      this.formValues.passport
    );

    this.buildingsService
      .addCustomer(newCustomer)
      .subscribe((res: { name: string }) => {
        this.customerId = res.name;
        this.addNewCont(this.newContract);
        console.log('new customer added with id: ' + this.customerId);
        this.inProgress = false;
      });
  }

  ngOnDestroy() {
    this.unitUpdateSub.unsubscribe();
  }
}
