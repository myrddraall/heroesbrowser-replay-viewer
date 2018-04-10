import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'section-loading',
  templateUrl: './section-loading.component.html',
  styleUrls: ['./section-loading.component.scss']
})
export class SectionLoadingComponent {

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
