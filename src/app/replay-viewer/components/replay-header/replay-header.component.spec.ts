import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayHeaderComponent } from './replay-header.component';

describe('ReplayHeaderComponent', () => {
  let component: ReplayHeaderComponent;
  let fixture: ComponentFixture<ReplayHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
