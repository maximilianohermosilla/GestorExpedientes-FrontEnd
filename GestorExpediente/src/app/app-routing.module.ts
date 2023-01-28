import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpedienteAbmComponent } from './components/expediente-abm/expediente-abm.component';
import { ExpedientesListaComponent } from './components/expedientes-lista/expedientes-lista.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
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
  /*{
    path: 'dashboard',
    //component: DashboardComponent, data :{ idPais :'1', idEstilo: '2', idMarca: '3', idCiudad: 4}
    component: DashboardComponent
  }, 
  {
    path: 'reportes',
    component: ReportesComponent
  },
  {
    path: '404',
     component:NotfoundComponent 
  },*/
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
