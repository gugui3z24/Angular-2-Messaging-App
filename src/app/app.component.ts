import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerTransition } from './app-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent {
  title = 'app';

  getState(outlet: RouterOutlet): string {
    return outlet.activatedRouteData['title'];
  }

}
