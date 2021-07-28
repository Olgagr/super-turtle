import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { EditorOutput } from 'src/interfaces/editor-output.interface';

@Injectable({
  providedIn: 'root'
})
export class InstructionsStoreService {
  public instructions$: Subject<EditorOutput> = new BehaviorSubject([] as EditorOutput);
  private instructions: EditorOutput = [];

  constructor() { }

  public updateInstructions(instructions: EditorOutput) {
    this.instructions = instructions;
    this.instructions$.next(this.instructions);
  }
}
