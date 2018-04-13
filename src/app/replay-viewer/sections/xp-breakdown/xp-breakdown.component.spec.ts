import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XpBreakdownComponent } from './xp-breakdown.component';

describe('XpBreakdownComponent', () => {
  let component: XpBreakdownComponent;
  let fixture: ComponentFixture<XpBreakdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpBreakdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XpBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
