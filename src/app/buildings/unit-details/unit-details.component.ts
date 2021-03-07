import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BuildingsService } from 'src/app/shared/buildings.service';
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
  newContractClicked = false;
  viewClicked = false;
  viewFinancial = false;

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
  }

  checkUnit() {
    const foundUnit = this.buildingsService.getCurrentUnit(this.unitId);
    foundUnit ? (this.currentUnit = foundUnit) : this.router.navigate(['../']);
  }

  onNewContract() {
    this.newContractClicked = !this.newContractClicked;
  }

  onViewContract() {
    this.viewClicked = !this.viewClicked;
    this.viewFinancial = false;
  }

  onViewFinancial() {
    this.viewFinancial = !this.viewFinancial;
    this.viewClicked = false;
  }
}
