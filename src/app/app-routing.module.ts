import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './components/message-list/message-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthRequired, AuthNotAllowed } from './guards/auth.guard';
import { InboxComponent } from './components/message-list/inbox/inbox.component';
import { SentComponent } from './components/message-list/sent/sent.component';
import { ComposeComponent } from './components/message-list/compose/compose.component';
import { ViewMessageComponent } from './components/message-list/inbox/view-message/view-message.component';
import { ViewMessageResolverService } from './components/message-list/inbox/view-message/view-message-resolver.service';
import { ViewSentMessageComponent } from './components/message-list/sent/view-sent-message/view-sent-message.component';
import { ViewSentMessageResolverService } from './components/message-list/sent/view-sent-message/view-sent-message-resolver.service';
import { AppResolverService } from './app-resover.service';
import { DraftComponent } from './components/message-list/draft/draft.component';
import { ViewDraftMessageResolverService } from './components/message-list/draft/view-draft-message/view-draft-message-resolver.service';
import { ViewDraftMessageComponent } from './components/message-list/draft/view-draft-message/view-draft-message.component';
import { ReplyComponent } from './components/message-list/reply/reply.component';
import { ReplyResolverService } from './components/message-list/reply/reply-resolver.service';
import { InboxResolverService } from './components/message-list/inbox/inbox-resolver.service';
import { SentResolverService } from './components/message-list/sent/sent-resolver.service';
import { DraftResolverService } from './components/message-list/draft/draft-resolver.service';
import { MessageListResolverService } from './components/message-list/message-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'messaging/inbox',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthNotAllowed],
    resolve: { titleResolver: AppResolverService },
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthNotAllowed],
    resolve: { titleResolver: AppResolverService },
    data: { title: 'Register' }
  },
  {
    path: 'messaging',
    component: MessageListComponent,
    resolve: { resolverData: MessageListResolverService },
    canActivate: [AuthRequired],
    children: [
      {
        path: '',
        redirectTo: '/messaging/inbox',
        pathMatch: 'full'
      },
      {
        path: 'inbox',
        component: InboxComponent,
        resolve: { titleResolver: AppResolverService, resolverData: InboxResolverService },
        data: { title: 'Inbox' },
        canActivate: [AuthRequired],
      },
      {
        path: 'inbox/:id',
        component: ViewMessageComponent,
        canActivate: [AuthRequired],
        resolve: { titleResolver: AppResolverService, resolverData: ViewMessageResolverService },
        data: { title: 'Inbox - Read' }
      },
      {
        path: 'sent',
        component: SentComponent,
        resolve: { titleResolver: AppResolverService, resolverData: SentResolverService },
        data: { title: 'Sent' },
        canActivate: [AuthRequired],
      },
      {
        path: 'sent/:id',
        component: ViewSentMessageComponent,
        resolve: { titleResolver: AppResolverService, resolverData: ViewSentMessageResolverService },
        data: { title: 'Sent - Read' },
        canActivate: [AuthRequired]
      },
      {
        path: 'draft',
        component: DraftComponent,
        resolve: { titleResolver: AppResolverService, resolverData: DraftResolverService },
        data: { title: 'Draft' },
        canActivate: [AuthRequired]
      },
      {
        path: 'draft/:id',
        component: ViewDraftMessageComponent,
        resolve: { titleResolver: AppResolverService, resolverData: ViewDraftMessageResolverService },
        data: { title: 'Draft - Read' },
        canActivate: [AuthRequired]
      },
      {
        path: 'compose',
        component: ComposeComponent,
        resolve: { titleResolver: AppResolverService },
        data: { title: 'New Message' },
        canActivate: [AuthRequired]
      },
      {
        path: 'reply',
        component: ReplyComponent,
        resolve: { titleResolver: AppResolverService, resolverData: ReplyResolverService },
        data: { title: 'Reply' },
        canActivate: [AuthRequired]
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'messaging',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
