import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EditorOutput } from '../interfaces/editor-output.interface';
import { INTERPRETER_COMMANDS } from '../interfaces/interpreter-commands.interface';
import { isValidInstruction } from './helpers/utils.helper';

@Injectable({
  providedIn: 'root',
})
export class InstructionsParserService {
  public parseEditorOutput(output: string): Observable<EditorOutput> {
    const rawInstructions = output.split('\n');
    const instructionRegExp = /^(\w+)/;
    const instructions = rawInstructions.map((i: string) => {
      const instructionMatch = instructionRegExp.exec(i.trim());
      if (!instructionMatch) return null;
      const instruction = instructionMatch[0];
      if (!isValidInstruction(instruction.toLocaleLowerCase())) return null;
      const value = i
        .trim()
        .replace(instruction, '')
        .split(',')
        .map((v) => Number(v.trim()));
      return [instruction.toLowerCase() as INTERPRETER_COMMANDS, value];
    });
    const validInstructions = instructions.filter(
      (i) => i !== null
    ) as EditorOutput;
    return new Observable((subscriber) => {
      subscriber.next(validInstructions);
    });
  }
}
