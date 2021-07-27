import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { INTERPRETER_COMMANDS } from 'src/interfaces/interpreter-commands.interface';
import { DrawingService } from '../drawing.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
  providers: [DrawingService],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas')
  private canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('hero')
  private heroImage!: ElementRef<HTMLImageElement>;

  constructor(public drawingService: DrawingService) {}

  ngAfterViewInit(): void {
    this.drawingService.init(this.canvas, this.heroImage);
  }

  onClick() {
    this.drawingService.refresh([
      [INTERPRETER_COMMANDS.PEN_WIDTH, [3]],
      [INTERPRETER_COMMANDS.DIRECTION, [45]],
      [INTERPRETER_COMMANDS.FORWARD, [100]],
      [INTERPRETER_COMMANDS.DIRECTION, [45]],
      [INTERPRETER_COMMANDS.FORWARD, [100]],
      [INTERPRETER_COMMANDS.DIRECTION, [-90]],
      [INTERPRETER_COMMANDS.FORWARD, [50]],
      [INTERPRETER_COMMANDS.PEN_WIDTH, [1]],
      [INTERPRETER_COMMANDS.DIRECTION, [-90]],
      [INTERPRETER_COMMANDS.FORWARD, [150]],
      [INTERPRETER_COMMANDS.TURN_RIGHT, [45]],
      [INTERPRETER_COMMANDS.FORWARD, [150]],
      [INTERPRETER_COMMANDS.GO, [300, 245]],
    ]);
  }
}
