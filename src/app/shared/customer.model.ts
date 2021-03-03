export class Customer {
  constructor(
    public name: string,
    public qId: number,
    public phone: number,
    public passport: string,
    public id?: string
  ) {}
}
