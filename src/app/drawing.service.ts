import { ElementRef, Injectable } from '@angular/core';
import { EditorOutput } from 'src/interfaces/editor-output.interface';
import { INTERPRETER_COMMANDS } from 'src/interfaces/interpreter-commands.interface';
import { PEN_MODE } from 'src/interfaces/pen-mode.interface';
import { Point } from 'src/interfaces/point.interface';
import { animationStep } from './helpers/utils.helper';
import { PenStoreService } from './pen-store.service';

@Injectable({
  providedIn: 'root',
})
export class DrawingService {
  public heroDimentions = {
    w: 40,
    h: 40,
  };
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private heroImage!: HTMLImageElement;
  private heroState: {
    origin: Point;
    degree: number;
    dimentions: { w: number; h: number };
  } = {
    origin: { x: 0, y: 0 },
    degree: 0,
    dimentions: this.heroDimentions,
  };

  private requestId: number = 0;

  constructor(private penStore: PenStoreService) {}

  public init(
    canvas: ElementRef<HTMLCanvasElement>,
    heroImage: ElementRef<HTMLImageElement>
  ) {
    this.canvas = canvas.nativeElement;
    this.ctx = canvas.nativeElement.getContext(
      '2d'
    ) as CanvasRenderingContext2D;
    this.heroImage = heroImage.nativeElement;
    this.render();
  }

  public refresh(commands: EditorOutput) {
    if (!this.canvas) return;
    if (this.requestId) window.cancelAnimationFrame(this.requestId);
    this.resetCanvasState();
    commands.forEach((command, index: number) => {
      const isLastCommand = index === commands.length - 1;
      switch (command[0]) {
        case INTERPRETER_COMMANDS.CENTER:
          this.moveHeroTo(this.heroAtCenterPoint);
          break;
        case INTERPRETER_COMMANDS.GO:
          this.requestId = this.run(isLastCommand, this.moveHeroTo.bind(this), {
            x: command[1][0],
            y: command[1][1],
          });
          break;
        case INTERPRETER_COMMANDS.GOX:
          this.requestId = this.run(isLastCommand, this.moveHeroTo.bind(this), {
            x: command[1][0],
          });
          break;
        case INTERPRETER_COMMANDS.GOY:
          this.requestId = this.run(isLastCommand, this.moveHeroTo.bind(this), {
            y: command[1][0],
          });
          break;
        case INTERPRETER_COMMANDS.FORWARD:
          this.moveHeroByDistance(command[1][0]);
          break;
        case INTERPRETER_COMMANDS.DIRECTION:
          this.rotateHero(command[1][0]);
          break;
        case INTERPRETER_COMMANDS.TURN_LEFT:
          this.rotateHero(-1 * command[1][0]);
          break;
        case INTERPRETER_COMMANDS.TURN_RIGHT:
          this.rotateHero(command[1][0]);
          break;
        case INTERPRETER_COMMANDS.PEN_DOWN:
          this.penStore.penState = { mode: PEN_MODE.ON };
          break;
        case INTERPRETER_COMMANDS.PEN_UP:
          this.penStore.penState = { mode: PEN_MODE.OFF };
          break;
        case INTERPRETER_COMMANDS.PEN_WIDTH:
          this.penStore.penState = { width: command[1][0] };
          break;
        case INTERPRETER_COMMANDS.PEN_COLOR:
          this.penStore.penState = { color: command[1] };
          break;
      }
    });
  }

  private render() {
    this.clearCanvas();
    this.moveHeroTo(this.heroAtCenterPoint);
    this.heroState.origin = this.heroAtCenterPoint;
  }

  private run(
    animate: boolean,
    callback: (...callbackArgs: any[]) => void,
    ...args: any[]
  ) {
    if (animate) {
      const step = animationStep(callback, ...args);
      return window.requestAnimationFrame(step);
    } else {
      callback(...args);
      return 0;
    }
  }

  private moveHeroTo(point: Partial<Point>, modifier?: number) {
    let { x, y } = this.heroState.origin;

    if (point.x) {
      x = point.x;
      if (modifier !== undefined) {
        if (point.x - this.heroState.origin.x > 0) {
          x = Math.min(point.x, this.heroState.origin.x + modifier);
        } else {
          x = Math.max(point.x, this.heroState.origin.x - modifier);
        }
      }
    }
    if (point.y) {
      y = point.y;
      if (modifier !== undefined) {
        if (point.y - this.heroState.origin.y > 0) {
          y = Math.min(point.y, this.heroState.origin.y + modifier);
        } else {
          y = Math.max(point.y, this.heroState.origin.y - modifier);
        }
      }
    }
    this.heroImage.style.transform = `translate(${x}px, ${y}px) rotate(${this.heroState.degree}deg)`;
    this.heroState.origin = { x, y };
  }

  private moveHeroByDistance(distance: number) {
    const degree = (Math.PI * (this.heroState.degree - 90)) / 180;
    const x = this.heroState.origin.x + distance * Math.cos(degree);
    const y = this.heroState.origin.y + distance * Math.sin(degree);
    const previousOrigin = { ...this.heroState.origin };
    this.moveHeroTo({ x, y });
    this.drawLine(previousOrigin, { x, y });
  }

  private drawLine(startPoint: Point, endPoint: Point) {
    if (this.penStore.penState.mode === PEN_MODE.OFF) return;
    const [r, g, b] = this.penStore.penState.color;
    this.ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;
    this.ctx.lineWidth = this.penStore.penState.width;
    this.ctx.beginPath();
    const { w, h } = this.heroState.dimentions;
    this.ctx.moveTo(startPoint.x + w / 2, startPoint.y + h / 2);
    this.ctx.lineTo(endPoint.x + w / 2, endPoint.y + h / 2);
    this.ctx.stroke();
  }

  private rotateHero(degree: number) {
    this.heroState.degree += degree;
    this.heroImage.style.transform = `translate(${this.heroState.origin.x}px, ${this.heroState.origin.y}px) rotate(${this.heroState.degree}deg)`;
  }

  private resetCanvasState() {
    this.clearCanvas();
    this.moveHeroTo(this.heroAtCenterPoint);
    this.rotateHero(-1 * this.heroState.degree);
  }

  private clearCanvas() {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0, 0, this.canvas.offsetWidth, this.canvas.offsetHeight);
  }

  private get heroAtCenterPoint(): Point {
    return {
      x: this.canvas.offsetWidth / 2 - this.heroImage.width / 2,
      y: this.canvas.offsetHeight / 2 - this.heroImage.height / 2,
    };
  }
}
