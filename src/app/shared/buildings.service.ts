import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Building } from './building.model';
import { map } from 'rxjs/operators';
import { Unit } from './unit.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingsService {
  buildings: Building[] = [];
  units: Unit[] = [];

  buildingsChanged = new Subject<Building[]>();
  buildingAddingStatus = new Subject<boolean>();

  unitsAddingStatus = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  // From here all are about buildings
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
      });
  }

  getBuilding(id: string) {
    const currentBuilding = this.buildings.find((build) => build.id === id);
    return currentBuilding;
  }

  addBuilding(newBuilding: Building) {
    this.http
      .post(
        'https://real-estate-v1-default-rtdb.firebaseio.com/buildings.json',
        newBuilding
      )
      .subscribe(
        (res: { name: string }) => {
          console.log(res);
          this.buildings.push({ ...newBuilding, id: res.name });
          this.buildingsChanged.next(this.buildings.slice());
          this.buildingAddingStatus.next(true);
        },
        (error) => {
          this.buildingAddingStatus.next(false);
        }
      );
  }

  // From here all are about units

  loadUnits() {
    this.http
      .get('https://real-estate-v1-default-rtdb.firebaseio.com/units.json')
      .pipe(
        map((resData): Unit[] => {
          const resUnits: Unit[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resUnits.push({ ...resData[key], id: key });
            }
          }
          return resUnits;
        })
      )
      .subscribe((resUnits) => {
        this.units = resUnits;
      });
  }

  getUnits() {
    return this.units.slice();
  }

  getBuildingUnits(parentId: string) {
    return this.units.filter((unit) => unit.parentId === parentId);
  }

  addUnit(parentId: string, newUnit: Unit) {
    if (this.buildings.find((building) => building.id === parentId)) {
      this.http
        .post(
          'https://real-estate-v1-default-rtdb.firebaseio.com/units.json',
          newUnit
        )
        .subscribe(
          () => {
            console.log('success for adding the unit!');
            this.units.push(newUnit);
            this.unitsAddingStatus.next(true);
          },
          (error) => {
            console.log(error);
            this.unitsAddingStatus.next(false);
          }
        );
    }
  }
}
