import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GseTickerComponent } from './gse-ticker.component';

describe('GseTickerComponent', () => {
  let component: GseTickerComponent;
  let fixture: ComponentFixture<GseTickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GseTickerComponent]
    });
    fixture = TestBed.createComponent(GseTickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
