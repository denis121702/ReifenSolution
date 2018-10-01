import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateFormatPipe} from './pipes/date-format-pipe.component';
import {ChartsModule} from 'ng2-charts';


@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  declarations: [
    DateFormatPipe
  ],
  exports: [
    MaterialComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DateFormatPipe,
    ChartsModule
  ],
  providers: [

  ]
})

export class SharedModule { }
