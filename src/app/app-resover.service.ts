import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable()
export class AppResolverService implements Resolve<void> {

  constructor(private titleService: Title) { }

  resolve(route: ActivatedRouteSnapshot) {
    this.titleService.setTitle(route.data.title);
  }

}
