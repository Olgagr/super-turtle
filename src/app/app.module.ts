import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { RendererComponent } from './renderer/renderer.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiRootModule } from '@taiga-ui/core';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    RendererComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    TuiRootModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
