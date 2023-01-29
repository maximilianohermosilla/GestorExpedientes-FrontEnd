import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './modules/shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common'

import { ActoAbmComponent } from './components/acto-abm/acto-abm.component';
import { CaratulaAbmComponent } from './components/caratula-abm/caratula-abm.component';
import { SituacionRevistaAbmComponent } from './components/situacion-revista-abm/situacion-revista-abm.component';
import { ExpedienteAbmComponent } from './components/expediente-abm/expediente-abm.component';
import { ToolbarComponent } from './components/shared/toolbar/toolbar.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { SpinnerInterceptorService } from './services/spinner-interceptor.service';
import { FooterComponent } from './components/shared/footer/footer.component';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ExpedientesListaComponent } from './components/expedientes-lista/expedientes-lista.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { ConfirmDialogComponent } from './components/shared/confirm-dialog/confirm-dialog.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';


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
    DialogComponent,
    FilterPipe,
    ExpedientesListaComponent,
    LandingPageComponent,
    ConfirmDialogComponent,
    LoginComponent,
    ReportesComponent,
    ConfiguracionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [DatePipe, FilterPipe,
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true}, 
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
