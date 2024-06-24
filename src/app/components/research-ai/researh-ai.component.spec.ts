import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearhAiComponent } from './researh-ai.component';

describe('ResearhAiComponent', () => {
  let component: ResearhAiComponent;
  let fixture: ComponentFixture<ResearhAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearhAiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResearhAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
