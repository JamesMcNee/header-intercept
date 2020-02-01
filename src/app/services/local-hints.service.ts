import { Injectable } from '@angular/core';
import { HintsService } from './hits-service';
import { Hint } from '../domain/hint.model';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalHintsService implements HintsService {

  private hints: Hint[] = [
    {
      text: 'If there are multiple profiles that have overlapping URL filters, the first matching profile will be applied.',
      icon: 'fas fa-info-circle'
    },
    {
      text: 'Why not contribute to this project, you can do so by visiting <a href="https://github.com/JamesMcNee/header-intercept">https://github.com/JamesMcNee/header-intercept</a>.',
      icon: 'fas fa-lightbulb'
    }
  ]

  constructor() { }

  getHintStream(intervalMillis: number = 30000): Observable<Hint> {
    return timer(0, intervalMillis).pipe(map((count) => {
      const indexToAccess = count % this.hints.length;

      return this.hints[indexToAccess];
    }));
  }
}
