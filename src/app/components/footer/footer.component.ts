import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { HINTS_SERVICE } from 'src/app/configuration/injection-tokens';
import { HintsService } from 'src/app/services/hits-service';
import { Observable } from 'rxjs';
import { Hint } from 'src/app/domain/hint.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  hint$: Observable<Hint>;

  constructor(@Inject(HINTS_SERVICE) private hintsService: HintsService) { }

  ngOnInit() {
    this.hint$ = this.hintsService.getHintStream();
  }

}
