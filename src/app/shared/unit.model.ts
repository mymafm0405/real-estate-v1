import { Contract } from './contract.model';

export class Unit {
  constructor(
    public unitNumber: number,
    public description: string,
    public price: number,
    public contract: Contract
  ) {}
}
