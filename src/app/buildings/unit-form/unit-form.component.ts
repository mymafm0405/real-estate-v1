import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-unit-form',
  templateUrl: './unit-form.component.html',
  styleUrls: ['./unit-form.component.css'],
})
export class UnitFormComponent implements OnInit {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  parentId: string;
  unitAddingStatus: boolean;
  submitted = false;
  unitAddingStatusSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private buildingsService: BuildingsService
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.parentId = params.id;
    });

    this.unitAddingStatusSub = this.buildingsService.unitsAddingStatus.subscribe(
      (status: boolean) => {
        this.submitted = true;
        this.unitAddingStatus = status;
        this.addForm.reset();
        setTimeout(() => {
          this.submitted = false;
        }, 2000);
      }
    );
  }

  onSubmit() {
    const newUnit = new Unit(
      this.parentId,
      '',
      this.addForm.value.name,
      this.addForm.value.details
    );

    this.buildingsService.addUnit(this.parentId, newUnit);
  }
}
