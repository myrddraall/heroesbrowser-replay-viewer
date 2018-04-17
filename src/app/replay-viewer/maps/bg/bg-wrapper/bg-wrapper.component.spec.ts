import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BgWrapperComponent } from './bg-wrapper.component';

describe('BgWrapperComponent', () => {
  let component: BgWrapperComponent;
  let fixture: ComponentFixture<BgWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BgWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BgWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
