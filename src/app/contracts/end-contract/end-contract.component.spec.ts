import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndContractComponent } from './end-contract.component';

describe('EndContractComponent', () => {
  let component: EndContractComponent;
  let fixture: ComponentFixture<EndContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EndContractComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EndContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
