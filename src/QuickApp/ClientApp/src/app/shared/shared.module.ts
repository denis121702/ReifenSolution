import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [],
  exports: [
    MaterialComponentsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

  ]
})

export class SharedModule { }
