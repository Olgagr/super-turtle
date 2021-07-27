import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { EditorParserService } from '../editor-parser.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  public editorControl: FormControl = new FormControl('');

  constructor(private editorParserService: EditorParserService) {}

  ngOnInit(): void {
    this.editorControl.valueChanges
      .pipe(debounceTime(800))
      .subscribe(this.editorParserService.parse);
  }
}
