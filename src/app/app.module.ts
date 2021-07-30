import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { RendererComponent } from './renderer/renderer.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiRootModule } from '@taiga-ui/core';
import { ToolBarComponent } from './tool-bar/tool-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    RendererComponent,
    CanvasComponent,
    ToolBarComponent
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
