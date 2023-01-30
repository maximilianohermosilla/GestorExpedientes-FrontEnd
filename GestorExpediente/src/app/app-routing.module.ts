import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { ExpedienteAbmComponent } from './components/expediente-abm/expediente-abm.component';
import { ExpedientesListaComponent } from './components/expedientes-lista/expedientes-lista.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {
    path: '',    
    redirectTo: 'menu',
    pathMatch: 'full' 
  },
  {
    path: 'menu',
    component: LandingPageComponent
  },
  {
    path: 'expedientes',
    component: ExpedientesListaComponent,
    canActivate: [GuardGuard] 
  },
  {
    path: 'expediente',
    component: ExpedienteAbmComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'reportes',
    component: ReportesComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'configuracion',
    component: ConfiguracionComponent,
    canActivate: [GuardGuard]
  },
  {
    path: '404',
     component:NotfoundComponent 
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent, data :{ idPais :'1', idEstilo: '2', idMarca: '3', idCiudad: 4}
  //   component: DashboardComponent
  // },
  { 
    path: '**',
    redirectTo: 'menu',
    pathMatch: 'full' 
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
