import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css'],
})
export class BuildingDetailsComponent implements OnInit, OnDestroy {
  currentId: string;
  currentBuilding: Building;
  showUnitForm = false;
  buildingUnits: Unit[] = [];
  unitsAddingStatusSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private buildingsService: BuildingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentId = params.id;
      this.currentBuilding = this.buildingsService.getBuilding(this.currentId);
      if (!this.currentBuilding) {
        this.router.navigate(['']);
      }
      this.buildingUnits = this.buildingsService.getBuildingUnits(
        this.currentId
      );
    });

    this.unitsAddingStatusSub = this.buildingsService.unitsAddingStatus.subscribe(
      (status: boolean) => {
        console.log(status);
        if (status) {
          this.buildingUnits = this.buildingsService.getBuildingUnits(
            this.currentId
          );
        }
      }
    );
  }

  onAddUnit() {
    this.showUnitForm = !this.showUnitForm;
  }

  ngOnDestroy() {
    this.unitsAddingStatusSub.unsubscribe();
  }
}
