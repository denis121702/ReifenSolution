import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponentsModule } from './material-components/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialComponentsModule
  ],
  declarations: [],
  exports: [
    MaterialComponentsModule
  ]
})

export class SharedModule { }
