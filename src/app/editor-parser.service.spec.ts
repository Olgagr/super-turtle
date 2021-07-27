import { TestBed } from '@angular/core/testing';
import { INTERPRETER_COMMANDS } from 'src/interfaces/interpreter-commands.interface';

import { EditorParserService } from './editor-parser.service';

fdescribe('EditorParserService', () => {
  let service: EditorParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorParserService);
  });

  describe('parse', () => {
    it('parses editor instructions', () => {
      const output = 'Forward 200\nGOX 300\npencoloR    255 ,0 ,255';

      expect(service.parse(output)).toEqual([
        [INTERPRETER_COMMANDS.FORWARD, [200]],
        [INTERPRETER_COMMANDS.GOX, [300]],
        [INTERPRETER_COMMANDS.PEN_COLOR, [255, 0, 255]],
      ]);
    });
  });
});
