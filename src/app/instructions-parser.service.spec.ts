import { TestBed } from '@angular/core/testing';
import { INTERPRETER_COMMANDS } from '../interfaces/interpreter-commands.interface';

import { InstructionsParserService } from './instructions-parser.service';

fdescribe('InstructionsParserService', () => {
  let service: InstructionsParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructionsParserService);
  });

  describe('parse', () => {
    it('parses editor instructions', () => {
      const output =
        'Forward 200\nGOX 300\npencoloR    255 ,0 ,255\nnotExistsInstruction 233';

      service.parseEditorOutput(output).subscribe((v) => {
        expect(v).toEqual([
          [INTERPRETER_COMMANDS.FORWARD, [200]],
          [INTERPRETER_COMMANDS.GOX, [300]],
          [INTERPRETER_COMMANDS.PEN_COLOR, [255, 0, 255]],
        ]);
      });
    });
  });
});
