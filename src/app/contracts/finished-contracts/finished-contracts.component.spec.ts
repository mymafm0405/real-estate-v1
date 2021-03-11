import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedContractsComponent } from './finished-contracts.component';

describe('FinishedContractsComponent', () => {
  let component: FinishedContractsComponent;
  let fixture: ComponentFixture<FinishedContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedContractsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishedContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
