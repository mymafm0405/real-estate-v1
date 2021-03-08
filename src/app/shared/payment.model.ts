export class Payment {
  constructor(
    public contractId: string,
    public amount: number,
    public date: string,
    public details: string,
    public employeeId: string,
    public id?: string
  ) {}
}
