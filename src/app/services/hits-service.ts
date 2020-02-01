import { Observable } from 'rxjs';
import { Hint } from '../domain/hint.model';

export interface HintsService {

    getHintStream(interval?: number): Observable<Hint>;
}