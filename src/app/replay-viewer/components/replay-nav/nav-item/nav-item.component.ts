import { Component, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges, HostBinding } from '@angular/core';
import { IReplayNavItem, IReplayNavItemLink, IReplayNavItemSection } from './IReplayNavItemData';

@Component({
  selector: 'nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavItemComponent implements OnChanges {

  @Input()
  public item: IReplayNavItemLink | IReplayNavItemSection;

  @Input()
  @HostBinding('attr.level')
  public level = 0;

  @HostBinding('class.section')
  public get isSection(): boolean {
    return this.item ? this.item.type === 'section' : false;
  }

  @HostBinding('class.link')
  public get isLink(): boolean {
    return this.item ? this.item.type === 'link' : false;
  }

  constructor() { }

  public ngOnChanges(changes: SimpleChanges): void {

  }

}
