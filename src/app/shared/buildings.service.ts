import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Building } from './building.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BuildingsService {
  buildings: Building[] = [];

  buildingsChanged = new Subject<Building[]>();
  buildingAddingStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getBuildings() {
    this.http
      .get('https://real-estate-v1-default-rtdb.firebaseio.com/buildings.json')
      .pipe(
        map((resData): Building[] => {
          const resBuilding: Building[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resBuilding.push({ ...resData[key], id: key });
            }
          }
          return resBuilding;
        })
      )
      .subscribe((resBuildings) => {
        this.buildings = resBuildings;
        this.buildingsChanged.next(this.buildings.slice());
        console.log(this.buildings);
      });
  }

  addBuilding(newBuilding: Building) {
    this.http
      .post(
        'https://real-estate-v1-default-rtdb.firebaseio.com/buildings.json',
        newBuilding
      )
      .subscribe(
        () => {
          this.buildings.push(newBuilding);
          this.buildingsChanged.next(this.buildings.slice());
          this.buildingAddingStatus.next(true);
        },
        (error) => {
          this.buildingAddingStatus.next(false);
        }
      );
  }
}
