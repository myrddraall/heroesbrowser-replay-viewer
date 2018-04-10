import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'section-not-supported',
  templateUrl: './section-not-supported.component.html',
  styleUrls: ['./section-not-supported.component.scss']
})
export class SectionNotSupportedComponent {

  private _message: string;
  public get message(): string {
    return this._message;
  }
  public set message(msg: string) {
    this._message = msg;
  }

  @HostBinding('style.display')
  public get isHidden(): string {
    return this._message ? undefined : 'none';
  }
}
