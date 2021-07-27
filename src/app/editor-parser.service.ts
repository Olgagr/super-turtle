import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorOutput } from 'src/interfaces/editor-output.interface';
import { INTERPRETER_COMMANDS } from 'src/interfaces/interpreter-commands.interface';

@Injectable({
  providedIn: 'root',
})
export class EditorParserService {
  public instructions: Observable<EditorOutput> = new Observable();

  constructor() {}

  public parse(output: string): any {
    const rawInstructions = output.split('\n');
    const instructionRegExp = /^(\w+)/;
    const instructions = rawInstructions.map((i: string) => {
      const instructionMatch = instructionRegExp.exec(i.trim());
      if (!instructionMatch) return null;
      const instruction = instructionMatch[0];
      const value = i
        .trim()
        .replace(instruction, '')
        .split(',')
        .map((v) => Number(v.trim()));
      return [instruction.toLowerCase() as INTERPRETER_COMMANDS, value];
    });
    return instructions;
  }

  private isValidInstruction(instruction: string): boolean {
    if (!instruction) return false;
    return Object.values(INTERPRETER_COMMANDS).includes(
      instruction.toLowerCase().trim() as INTERPRETER_COMMANDS
    );
  }
}
