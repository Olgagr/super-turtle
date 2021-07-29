import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { EditorOutput } from 'src/interfaces/editor-output.interface';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @Input()
  set instructions(v: EditorOutput | null) {
    if (!v) return;
    this.drawingService.refresh(v)
  }

  @ViewChild('canvas')
  private canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('hero')
  private heroImage!: ElementRef<HTMLImageElement>;

  constructor(public drawingService: DrawingService) {}

  ngAfterViewInit(): void {
    this.drawingService.init(this.canvas, this.heroImage);
  }
}
