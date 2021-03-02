import { Contract } from './contract.model';

export class Unit {
  constructor(
    public parentId: string,
    public contractId: string,
    public name: string,
    public details: string,
    public id?: string
  ) {}
}
