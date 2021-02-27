import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-building',
  templateUrl: './add-building.component.html',
  styleUrls: ['./add-building.component.css'],
})
export class AddBuildingComponent implements OnInit {
  addClicked = false;
  constructor() {}

  ngOnInit(): void {}

  onAddClick() {
    this.addClicked = !this.addClicked;
  }
}
