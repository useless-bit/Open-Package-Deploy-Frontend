import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class ApplicationLoadedService {
  private _initFinished = new BehaviorSubject<boolean>(false);
  public readonly initFinished = this._initFinished.asObservable();

  public emitInitFinished(value: boolean): void {
    this._initFinished.next(value);
  }
}
