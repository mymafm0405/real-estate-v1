import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinSummaryComponent } from './fin-summary.component';

describe('FinSummaryComponent', () => {
  let component: FinSummaryComponent;
  let fixture: ComponentFixture<FinSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
