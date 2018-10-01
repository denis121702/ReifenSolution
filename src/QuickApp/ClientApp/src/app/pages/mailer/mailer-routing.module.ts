import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailerListComponent } from './mailer-list/mailer-list.component';
import { MailerDetailsComponent } from './mailer-details/mailer-details.component';

const routes: Routes = [
  { path: '', component: MailerListComponent },
  { path: 'details/:id', component: MailerDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MailerRoutingModule { }
