import { ElementRef, Injectable } from '@angular/core';
import { EditorOutput } from 'src/interfaces/editor-output.interface';
import { INTERPRETER_COMMANDS } from 'src/interfaces/interpreter-commands.interface';
import { PEN_MODE } from 'src/interfaces/pen-mode.interface';
import { Point } from 'src/interfaces/point.interface';

@Injectable()
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
  private penState: {
    mode: PEN_MODE,
    width: number,
    color: number[]
  } = {mode: PEN_MODE.ON, width: 1, color: [0,0,0]}

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
    this.resetCanvasState();
    commands.forEach((command) => {
      switch (command[0]) {
        case INTERPRETER_COMMANDS.CENTER:
          this.moveHeroTo(this.heroAtCenterPoint);
          break;
        case INTERPRETER_COMMANDS.GO:
          this.moveHeroTo({ x: command[1][0], y: command[1][1] });
          break;
        case INTERPRETER_COMMANDS.GOX:
          this.moveHeroTo({ x: command[1][0] });
          break;
        case INTERPRETER_COMMANDS.GOY:
          this.moveHeroTo({ y: command[1][0] });
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
          this.penState.mode = PEN_MODE.ON;
          break;
        case INTERPRETER_COMMANDS.PEN_UP:
          this.penState.mode = PEN_MODE.OFF;
          break;
        case INTERPRETER_COMMANDS.PEN_WIDTH:
          this.penState.width = command[1][0];
          break;
        case INTERPRETER_COMMANDS.PEN_COLOR:
          this.penState.color = command[1];
          break;
      }
    });
  }

  private render() {
    this.clearCanvas();
    this.moveHeroTo(this.heroAtCenterPoint);
    this.heroState.origin = this.heroAtCenterPoint;
    console.log(this.heroAtCenterPoint)
  }

  private moveHeroTo(point: Partial<Point>) {
    if (point.x) {
      this.heroImage.style.left = `${point.x}px`;
      this.heroState.origin.x = point.x;
    }
    if (point.y) {
      this.heroImage.style.top = `${point.y}px`;
      this.heroState.origin.y = point.y;
    }
  }

  private moveHeroByDistance(distance: number) {
    const degree = (Math.PI * (this.heroState.degree - 90)) / 180;
    const x = this.heroState.origin.x + distance * Math.cos(degree);
    const y = this.heroState.origin.y + distance * Math.sin(degree);
    const previousOrigin = {...this.heroState.origin};
    this.moveHeroTo({ x, y });
    this.drawLine(previousOrigin, {x, y});
  }

  private drawLine(startPoint: Point, endPoint: Point) {
    if (this.penState.mode === PEN_MODE.OFF) return;
    const [r,g,b] = this.penState.color;
    this.ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    this.ctx.lineWidth = this.penState.width;
    this.ctx.beginPath();
    const {w, h} = this.heroState.dimentions;
    this.ctx.moveTo(startPoint.x + w/2, startPoint.y + h/2);
    this.ctx.lineTo(endPoint.x + w/2, endPoint.y + h/2);
    this.ctx.stroke();
  }

  private rotateHero(degree: number) {
    this.heroState.degree += degree;
    this.heroImage.style.transform = `rotate(${this.heroState.degree}deg)`;
  }

  private resetCanvasState() {
    this.clearCanvas();
    this.moveHeroTo(this.heroAtCenterPoint);
    this.rotateHero(-1 * this.heroState.degree);
  }

  private clearCanvas() {
    this.ctx.fillStyle = 'rgb(255, 255, 255)';
    this.ctx.fillRect(0 ,0, this.canvas.offsetWidth, this.canvas.offsetHeight);
  }

  private get heroAtCenterPoint(): Point {
    return {
      x: this.canvas.offsetWidth / 2 - this.heroImage.width / 2,
      y: this.canvas.offsetHeight / 2 - this.heroImage.height / 2,
    };
  }
}
