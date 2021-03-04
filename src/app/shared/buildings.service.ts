import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Building } from './building.model';
import { map } from 'rxjs/operators';
import { Unit } from './unit.model';
import { Contract } from './contract.model';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root',
})
export class BuildingsService {
  buildings: Building[] = [];
  units: Unit[] = [];
  contracts: Contract[] = [];
  customers: Customer[] = [];

  buildingsChanged = new Subject<Building[]>();
  buildingAddingStatus = new Subject<boolean>();

  unitsAddingStatus = new Subject<boolean>();
  unitUpdateStatus = new Subject<boolean>();

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

  getCurrentUnit(unitId: string): Unit {
    return this.units.find((unit) => unit.id === unitId);
  }

  addUnit(parentId: string, newUnit: Unit) {
    if (this.buildings.find((building) => building.id === parentId)) {
      this.http
        .post(
          'https://real-estate-v1-default-rtdb.firebaseio.com/units.json',
          newUnit
        )
        .subscribe(
          (res: { name: string }) => {
            console.log('success for adding the unit!');
            this.units.push({ ...newUnit, id: res.name });
            this.unitsAddingStatus.next(true);
          },
          (error) => {
            console.log(error);
            this.unitsAddingStatus.next(false);
          }
        );
    }
  }

  // All about contracts from here...

  addContract(newContract: Contract) {
    const foundUnit = this.units.find((unit) => unit.id === newContract.unitId);
    if (foundUnit) {
      this.http
        .post(
          'https://real-estate-v1-default-rtdb.firebaseio.com/contracts.json',
          newContract
        )
        .subscribe(
          (res: { name: string }) => {
            const contractId = res.name;
            this.http
              .patch(
                'https://real-estate-v1-default-rtdb.firebaseio.com/units/' +
                  newContract.unitId +
                  '.json',
                { contractId: contractId }
              )
              .subscribe(() => {
                foundUnit.contractId = contractId;
                this.unitUpdateStatus.next(true);
                this.loadContracts();
                this.loadCustomers();
              });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  loadContracts() {
    this.http
      .get('https://real-estate-v1-default-rtdb.firebaseio.com/contracts.json')
      .pipe(
        map((resData): Contract[] => {
          const resContracts: Contract[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resContracts.push({ ...resData[key], id: key });
            }
          }
          return resContracts;
        })
      )
      .subscribe((resContracts) => {
        this.contracts = resContracts;
      });
  }

  getUnitContract(unitId: string) {
    return this.contracts.find((contract) => contract.unitId === unitId);
  }

  // All about customers from here...

  getContractsForCustomer(customerId: string) {
    const foundContracts = this.contracts.filter(
      (contract) => contract.customerId === customerId
    );
    console.log(foundContracts);
  }

  addCustomer(newCustomer: Customer) {
    return this.http.post(
      'https://real-estate-v1-default-rtdb.firebaseio.com/customers.json',
      newCustomer
    );
  }

  loadCustomers() {
    this.http
      .get('https://real-estate-v1-default-rtdb.firebaseio.com/customers.json')
      .pipe(
        map((resData): Customer[] => {
          const resCustomers: Customer[] = [];
          for (const key in resData) {
            if (resData.hasOwnProperty(key)) {
              resCustomers.push({ ...resData[key], id: key });
            }
          }
          return resCustomers;
        })
      )
      .subscribe((resCustomers) => {
        this.customers = resCustomers;
        console.log('Customers loaded successfully!');
      });
  }

  checkCustomer(qid: number, phone: number) {
    const foundCustomer = this.customers.find(
      (customer) => customer.qId === qid || customer.phone === phone
    );
    console.log(foundCustomer);
    return foundCustomer;
  }

  getCustomer(customerId: string) {
    const foundCustomer = this.customers.find(
      (customer) => customer.id === customerId
    );
    return foundCustomer;
  }
}
