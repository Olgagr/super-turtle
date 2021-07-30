import { Component, OnInit } from '@angular/core';
import { PEN_MODE } from 'src/interfaces/pen-mode.interface';
import { PenStoreService } from '../pen-store.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss'],
})
export class ToolBarComponent implements OnInit {
  public penMode: PEN_MODE = PEN_MODE.ON;
  public penColor: string = '';
  public penWidth: number = 1;

  constructor(private penStoreService: PenStoreService) {}

  ngOnInit(): void {
    this.penStoreService.penState$.subscribe(
      ({ mode, color: [r, g, b], width }) => {
        this.penMode = mode;
        this.penColor = `rgb(${r},${g},${b})`;
        this.penWidth = width;
      }
    );
  }
}
