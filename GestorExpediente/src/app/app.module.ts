import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ActoAbmComponent } from './components/acto-abm/acto-abm.component';
import { CaratulaAbmComponent } from './components/caratula-abm/caratula-abm.component';
import { SituacionRevistaAbmComponent } from './components/situacion-revista-abm/situacion-revista-abm.component';
import { ExpedienteAbmComponent } from './components/expediente-abm/expediente-abm.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ActoAbmComponent,
    CaratulaAbmComponent,
    SituacionRevistaAbmComponent,
    ExpedienteAbmComponent,
    ToolbarComponent,
    SpinnerComponent,
    FooterComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
