import { Unit } from './unit.model';

export class Building {
  constructor(
    public name: string,
    public address: string,
    public price: number,
    public units: Unit[],
    public id?: string
  ) {}
}
