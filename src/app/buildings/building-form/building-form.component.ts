import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';

@Component({
  selector: 'app-building-form',
  templateUrl: './building-form.component.html',
  styleUrls: ['./building-form.component.css'],
})
export class BuildingFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  buildingAddingStatusSub: Subscription;
  addingStatus: boolean;
  submitted = false;

  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.buildingAddingStatusSub = this.buildingsService.buildingAddingStatus.subscribe(
      (status: boolean) => {
        this.submitted = true;
        this.addingStatus = status;
      }
    );
  }

  onSubmit() {
    console.log(this.addForm.value);
    const newBuilding: Building = this.addForm.value;
    this.buildingsService.addBuilding(newBuilding);
    this.addForm.reset();
    setTimeout(() => {
      this.submitted = false;
    }, 2000);
  }

  ngOnDestroy() {
    this.buildingAddingStatusSub.unsubscribe();
  }
}
