import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Contract } from 'src/app/shared/contract.model';

@Component({
  selector: 'app-contract-summary',
  templateUrl: './contract-summary.component.html',
  styleUrls: ['./contract-summary.component.css'],
})
export class ContractSummaryComponent implements OnInit {
  foundContract: Contract;
  unitId: string;
  constructor(
    private buildingsService: BuildingsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.unitId = params.unitId;
      this.foundContract = this.buildingsService.getUnitContract(this.unitId);
    });
  }
}
