import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(SidenavComponent) private sideNav: ElementRef;
  private toggleListen: any;

  constructor(
    private _authenticationService: AuthenticationService,
    private renderer: Renderer2
  ) { }

  public logout(): void {
    this._authenticationService.logout();
  }

  public isLoggedIn(): boolean {
    return this._authenticationService.loggedIn();
  }

  public closeSideNav(): void {
    this.toggleListen();
    this.renderer.setStyle(this.sideNav['sideNav'].nativeElement, 'width', '0');
  }

  public openSideNav(): void {
    const currentWidth = this.sideNav['sideNav'].nativeElement.style.width;
    if (currentWidth === '200px') {
      this.closeSideNav();
    } else {
      this.renderer.setStyle(this.sideNav['sideNav'].nativeElement, 'width', '200px');
      setTimeout(() => {
        this.toggleListen = this.renderer.listen('document', 'click', () => {
          this.closeSideNav();
        });
      }, 0);
    }

  }

  ngOnInit() {
  }

}
