import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentReplayTooltipComponent } from './recent-replay-tooltip.component';

describe('RecentReplayTooltipComponent', () => {
  let component: RecentReplayTooltipComponent;
  let fixture: ComponentFixture<RecentReplayTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentReplayTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentReplayTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
