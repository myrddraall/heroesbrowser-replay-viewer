import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNotSupportedComponent } from './section-not-supported.component';

describe('SectionNotSupportedComponent', () => {
  let component: SectionNotSupportedComponent;
  let fixture: ComponentFixture<SectionNotSupportedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionNotSupportedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNotSupportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
