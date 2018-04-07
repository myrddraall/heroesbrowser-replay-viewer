import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplayNavComponent } from './replay-nav.component';

describe('ReplayNavComponent', () => {
  let component: ReplayNavComponent;
  let fixture: ComponentFixture<ReplayNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplayNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
