import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentTipComponent } from './talent-tip.component';

describe('TalentTipComponent', () => {
  let component: TalentTipComponent;
  let fixture: ComponentFixture<TalentTipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentTipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
