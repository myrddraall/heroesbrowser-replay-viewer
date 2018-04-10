import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionLoadingComponent } from './section-loading.component';

describe('SectionLoadingComponent', () => {
  let component: SectionLoadingComponent;
  let fixture: ComponentFixture<SectionLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
