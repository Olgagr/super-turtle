import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { InstructionsParserService } from '../instructions-parser.service';
import { InstructionsStoreService } from '../instructions-store.service';
import { PenStoreService } from '../pen-store.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, OnDestroy {
  public editorControl: FormControl = new FormControl('');
  private destroySubject$: Subject<boolean> = new Subject();

  constructor(
    private parserService: InstructionsParserService,
    private instructionsStoreService: InstructionsStoreService,
    public penStoreService: PenStoreService
  ) {}

  ngOnInit(): void {
    this.editorControl.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap(this.parserService.parseEditorOutput),
        takeUntil(this.destroySubject$)
      )
      .subscribe((v) => this.instructionsStoreService.updateInstructions(v));
  }

  ngOnDestroy(): void {
    this.destroySubject$.next(true);
    this.destroySubject$.unsubscribe();
  }
}
