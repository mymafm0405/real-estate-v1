import { Component, OnInit } from '@angular/core';
import { BuildingsService } from './shared/buildings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'real-estate-v1';

  constructor(private buildingsService: BuildingsService) {}
  ngOnInit() {
    this.buildingsService.loadUnits();
    this.buildingsService.loadContracts();
    this.buildingsService.loadCustomers();
    this.buildingsService.loadPayments();
  }
}
