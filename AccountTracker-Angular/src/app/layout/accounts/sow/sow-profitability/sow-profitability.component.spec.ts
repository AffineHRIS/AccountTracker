import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SowProfitabilityComponent } from './sow-profitability.component';

describe('SowProfitabilityComponent', () => {
  let component: SowProfitabilityComponent;
  let fixture: ComponentFixture<SowProfitabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowProfitabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SowProfitabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
