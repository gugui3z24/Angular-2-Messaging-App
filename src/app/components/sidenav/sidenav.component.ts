import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sideNav') private sideNav: ElementRef;

  constructor(
    private renderer: Renderer2,
    private _authenticationService: AuthenticationService
  ) { }

  public closeSideNav(): void {
    this.renderer.setStyle(this.sideNav.nativeElement, 'width', '0');
  }

  public isLoggedIn(): boolean {
    return this._authenticationService.loggedIn();
  }

  public logout(): void {
    this._authenticationService.logout();
  }

  ngOnInit() {
  }

}
