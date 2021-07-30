import { Component, Input } from '@angular/core';
import { PEN_MODE } from 'src/interfaces/pen-mode.interface';
import { penState } from '../pen-store.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent {
  @Input() set penState(penState: penState | null) {
    if (!penState) return;
    const {
      mode,
      color: [r, g, b],
      width,
    } = penState;
    this.penMode = mode;
    this.penColor = `rgb(${r},${g},${b})`;
    this.penWidth = width;
  }

  public penMode: PEN_MODE = PEN_MODE.ON;
  public penColor: string = '';
  public penWidth: number = 1;
}
