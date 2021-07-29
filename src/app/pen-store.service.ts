import { Injectable } from '@angular/core';
import { PEN_MODE } from 'src/interfaces/pen-mode.interface';

type penState = {
  mode: PEN_MODE;
  width: number;
  color: number[];
}

@Injectable({
  providedIn: 'root'
})
export class PenStoreService {

  private _penState: penState = { mode: PEN_MODE.ON, width: 1, color: [0, 0, 0] };

  get penState(): penState {
    return this._penState;
  }

  set penState(state: Partial<penState>) {
    this._penState = {...this._penState, ...state};
  }
}
