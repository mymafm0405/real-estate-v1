import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundContractComponent } from './found-contract.component';

describe('FoundContractComponent', () => {
  let component: FoundContractComponent;
  let fixture: ComponentFixture<FoundContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
