import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BondMarketComponent } from './bond-market.component';

describe('BondMarketComponent', () => {
  let component: BondMarketComponent;
  let fixture: ComponentFixture<BondMarketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BondMarketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BondMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
