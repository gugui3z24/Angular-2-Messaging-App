// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { environment } from '../environments/environment';
const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

// Pipes
import { SortPipe } from './pipes/sort.pipe';

// Services
import { AuthenticationService } from './services/authentication.service';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { ErrorService } from './services/error.service';
import { SocketService } from './services/socket.service';
import { AlertService } from './components/alert/alert.service';
import { OverlayService } from './components/overlay/overlay.service';
import { SentService } from './components/message-list/sent/sent.service';
import { InboxService } from './components/message-list/inbox/inbox.service';
import { ComposeService } from './components/message-list/compose/compose.service';
import { DraftService } from './components/message-list/draft/draft.service';

// Resolvers
import { ViewMessageResolverService } from './components/message-list/inbox/view-message/view-message-resolver.service';
import { ViewSentMessageResolverService } from './components/message-list/sent/view-sent-message/view-sent-message-resolver.service';
import { AppResolverService } from './app-resover.service';
import { ViewDraftMessageResolverService } from './components/message-list/draft/view-draft-message/view-draft-message-resolver.service';
import { ReplyResolverService } from './components/message-list/reply/reply-resolver.service';
import { InboxResolverService } from './components/message-list/inbox/inbox-resolver.service';
import { SentResolverService } from './components/message-list/sent/sent-resolver.service';
import { DraftResolverService } from './components/message-list/draft/draft-resolver.service';
import { MessageListResolverService } from './components/message-list/message-list-resolver.service';

// Guards
import { AuthRequired, AuthNotAllowed } from './guards/auth.guard';

// Components
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MessageListComponent } from './components/message-list/message-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { InboxComponent } from './components/message-list/inbox/inbox.component';
import { SentComponent } from './components/message-list/sent/sent.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { ComposeComponent } from './components/message-list/compose/compose.component';
import { ViewMessageComponent } from './components/message-list/inbox/view-message/view-message.component';
import { ViewSentMessageComponent } from './components/message-list/sent/view-sent-message/view-sent-message.component';
import { DraftComponent } from './components/message-list/draft/draft.component';
import { ViewDraftMessageComponent } from './components/message-list/draft/view-draft-message/view-draft-message.component';
import { ReplyComponent } from './components/message-list/reply/reply.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MessageListComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    NavbarComponent,
    SidenavComponent,
    InboxComponent,
    SentComponent,
    OverlayComponent,
    ComposeComponent,
    ViewMessageComponent,
    SortPipe,
    ViewSentMessageComponent,
    DraftComponent,
    ViewDraftMessageComponent,
    ReplyComponent
  ],
  entryComponents: [
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    AuthenticationService,
    AlertService,
    ErrorService,
    SentService,
    AuthRequired,
    ViewMessageResolverService,
    InboxService,
    OverlayService,
    ComposeService,
    AuthNotAllowed,
    SortPipe,
    ViewSentMessageResolverService,
    AppResolverService,
    DraftService,
    DraftResolverService,
    ViewDraftMessageResolverService,
    ReplyResolverService,
    SocketService,
    InboxResolverService,
    SentResolverService,
    MessageListResolverService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
