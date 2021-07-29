import {INTERPRETER_COMMANDS} from '../../interfaces/interpreter-commands.interface';

export function isValidInstruction(instruction: string): boolean {
  if (!instruction) return false;
  return Object.values(INTERPRETER_COMMANDS).includes(
    instruction.toLowerCase().trim() as INTERPRETER_COMMANDS
  );
}


export function animationStep(callback: (...args: any[]) => void, ...callbackArgs: any[]) {
  let start: number, previousTimeStamp: number;
  return function step(timestamp: number) {
    if (start === undefined) {
      start = timestamp;
    }
    const elapsed = timestamp - start;

    if (previousTimeStamp !== timestamp) {
      callback(...callbackArgs, elapsed * 0.1);
    }

    if (elapsed < 1000) {
      previousTimeStamp = timestamp;
      window.requestAnimationFrame(step);
    }
  }
}
