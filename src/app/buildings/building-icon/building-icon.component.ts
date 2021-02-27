import { Component, Input, OnInit } from '@angular/core';
import { Building } from 'src/app/shared/building.model';

@Component({
  selector: 'app-building-icon',
  templateUrl: './building-icon.component.html',
  styleUrls: ['./building-icon.component.css'],
})
export class BuildingIconComponent implements OnInit {
  @Input() currentBuilding: Building;
  constructor() {}

  ngOnInit(): void {}
}
