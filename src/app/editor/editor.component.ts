import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { InstructionsParserService } from '../instructions-parser.service';
import { InstructionsStoreService } from '../instructions-store.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public editorControl: FormControl = new FormControl('');

  constructor(private parserService: InstructionsParserService, private instructionsStoreService: InstructionsStoreService) {}

  ngOnInit(): void {
    this.editorControl.valueChanges
      .pipe(debounceTime(800), switchMap(this.parserService.parseEditorOutput))
      .subscribe((v) => this.instructionsStoreService.updateInstructions(v));
  }
}
