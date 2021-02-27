import { Customer } from './customer.model';

export class Contract {
  constructor(
    public contractNumber: number,
    public start: string,
    public monthPrice: number,
    public numOfMonths: number,
    public customer: Customer
  ) {}
}
