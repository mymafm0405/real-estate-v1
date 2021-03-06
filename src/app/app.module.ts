import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { BuildingIconComponent } from './buildings/building-icon/building-icon.component';
import { UnitIconComponent } from './buildings/unit-icon/unit-icon.component';
import { UnitDetailsComponent } from './buildings/unit-details/unit-details.component';
import { BuildingDetailsComponent } from './buildings/building-details/building-details.component';
import { BuildingFormComponent } from './buildings/building-form/building-form.component';
import { UnitFormComponent } from './buildings/unit-form/unit-form.component';
import { CustomerDetailsComponent } from './customers/customer-details/customer-details.component';
import { CustomerFormComponent } from './customers/customer-form/customer-form.component';
import { ReceiptFormComponent } from './receipts/receipt-form/receipt-form.component';
import { ReceiptDetailsComponent } from './receipts/receipt-details/receipt-details.component';
import { ContractSummaryComponent } from './contracts/contract-summary/contract-summary.component';
import { AddBuildingComponent } from './buildings/add-building/add-building.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UnitsComponent } from './buildings/units/units.component';
import { RouterModule, Routes } from '@angular/router';
import { ContractFormComponent } from './contracts/contract-form/contract-form.component';
import { FinSummaryComponent } from './financials/fin-summary/fin-summary.component';
import { AddPaymentComponent } from './financials/add-payment/add-payment.component';
import { ViewPaymentsComponent } from './financials/view-payments/view-payments.component';
import { EndContractComponent } from './contracts/end-contract/end-contract.component';
import { FinishedContractsComponent } from './contracts/finished-contracts/finished-contracts.component';
import { FoundContractComponent } from './contracts/found-contract/found-contract.component';
const appRoutes: Routes = [
  { path: '', component: BuildingsComponent },
  {
    path: 'building/:id',
    component: BuildingDetailsComponent,
    children: [{ path: 'unit-form', component: UnitFormComponent }],
  },
  { path: 'building/:id/unit/:unitId', component: UnitDetailsComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    BuildingsComponent,
    BuildingIconComponent,
    UnitIconComponent,
    UnitDetailsComponent,
    BuildingDetailsComponent,
    BuildingFormComponent,
    UnitFormComponent,
    CustomerDetailsComponent,
    CustomerFormComponent,
    ReceiptFormComponent,
    ReceiptDetailsComponent,
    ContractSummaryComponent,
    AddBuildingComponent,
    UnitsComponent,
    ContractFormComponent,
    FinSummaryComponent,
    AddPaymentComponent,
    ViewPaymentsComponent,
    EndContractComponent,
    FinishedContractsComponent,
    FoundContractComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
