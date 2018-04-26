import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentIconComponent } from './talent-icon.component';

describe('TalentIconComponent', () => {
  let component: TalentIconComponent;
  let fixture: ComponentFixture<TalentIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalentIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
