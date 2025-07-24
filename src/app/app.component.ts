import { ChangeDetectionStrategy, Component } from '@angular/core'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `<div class="container"><router-outlet></router-outlet></div>`,
  styles: [`
    .container {
      width: 80%;
      margin: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
