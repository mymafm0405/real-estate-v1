import { Customer } from './customer.model';

export class Contract {
  constructor(
    public buildingId: string,
    public unitId: string,
    public startDate: string,
    public monthPrice: number,
    public numOfMonths: number,
    public customerId?: string,
    public id?: string
  ) {}
}
