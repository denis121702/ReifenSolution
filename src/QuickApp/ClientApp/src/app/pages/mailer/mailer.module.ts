import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MailerListComponent } from './mailer-list/mailer-list.component';
import { MailerRoutingModule } from './mailer-routing.module';
import { MailerDetailsComponent } from './mailer-details/mailer-details.component';

@NgModule({
  imports: [
    SharedModule,
    MailerRoutingModule,
  ],
  declarations: [
    MailerListComponent,
    MailerDetailsComponent
  ]
})
export class MailerModule { }
