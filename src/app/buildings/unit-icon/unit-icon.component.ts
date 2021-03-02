import { Component, OnInit, Input } from '@angular/core';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-unit-icon',
  templateUrl: './unit-icon.component.html',
  styleUrls: ['./unit-icon.component.css'],
})
export class UnitIconComponent implements OnInit {
  @Input() unit: Unit;
  constructor() {}

  ngOnInit(): void {}
}
