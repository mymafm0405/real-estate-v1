import { Customer } from './customer.model';

export class Contract {
  constructor(
    public contractNumber: number,
    public buildingId: string,
    public unitId: string,
    public startDate: string,
    public monthPrice: number,
    public numOfMonths: number,
    public id?: string
  ) {}
}
