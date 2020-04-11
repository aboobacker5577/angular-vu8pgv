import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule, MatTreeModule, MatIconModule} from '@angular/material'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RenderDebugDirective } from "./render-debug/render.debug.directive";
import { AppComponent } from './app.component';

@NgModule({
  imports:      [
    BrowserModule,
    MatTreeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [ AppComponent, RenderDebugDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
