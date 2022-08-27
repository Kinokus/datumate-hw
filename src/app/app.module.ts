import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GcpListComponent } from './components/gcp-list/gcp-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GcpListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
