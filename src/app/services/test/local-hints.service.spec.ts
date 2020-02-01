import { TestBed, getTestBed } from '@angular/core/testing';

import { LocalHintsService } from '../local-hints.service';
import { HintsService } from '../hits-service';

describe('LocalHintsService', () => {

  let service: HintsService;

  beforeEach(() => {
      TestBed.configureTestingModule({
          providers: [
              LocalHintsService
          ]
      });

      const testBed = getTestBed();
      service = testBed.get(LocalHintsService);
  });

  describe('getHintStream()', () => {
    it('should return a hint on subscribe', (done) => {
      service.getHintStream(1000).subscribe((hint) => {
        expect(hint).toBeTruthy();
        done();
      });
    });
  });
});
