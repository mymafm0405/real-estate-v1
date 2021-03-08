import { Component, Input, OnInit } from '@angular/core';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Payment } from 'src/app/shared/payment.model';

@Component({
  selector: 'app-view-payments',
  templateUrl: './view-payments.component.html',
  styleUrls: ['./view-payments.component.css'],
})
export class ViewPaymentsComponent implements OnInit {
  @Input() contractId: string;
  @Input() totalPaid: number;
  allPayments: Payment[] = [];
  constructor(private buildingsService: BuildingsService) {}

  ngOnInit(): void {
    this.allPayments = this.buildingsService.getPaymentsForContract(
      this.contractId
    );
  }
}
