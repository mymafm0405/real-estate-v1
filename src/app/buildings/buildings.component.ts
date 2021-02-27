import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Building } from '../shared/building.model';
import { BuildingsService } from '../shared/buildings.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.css'],
})
export class BuildingsComponent implements OnInit, OnDestroy {
  allBuildings: Building[] = [];
  loading = true;
  buildingsChangesSub: Subscription;
  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.buildingsService.getBuildings();
    this.buildingsChangesSub = this.buildingsService.buildingsChanged.subscribe(
      (resData) => {
        this.allBuildings = resData;
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.buildingsChangesSub.unsubscribe();
  }
}
