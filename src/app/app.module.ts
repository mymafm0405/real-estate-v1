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
import { ContractSummaryComponent } from './cotracts/contract-summary/contract-summary.component';
import { AddBuildingComponent } from './buildings/add-building/add-building.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UnitsComponent } from './buildings/units/units.component';
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: '', component: BuildingsComponent },
  {
    path: 'building/:id',
    component: BuildingDetailsComponent,
    children: [{ path: 'unit-form', component: UnitFormComponent }],
  },
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
