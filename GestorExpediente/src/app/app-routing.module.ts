import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpedienteAbmComponent } from './components/expediente-abm/expediente-abm.component';

const routes: Routes = [
  {
    path: '',    
    redirectTo: 'menu',
    pathMatch: 'full' 
  },
  {
    path: 'expedientes',
    component: ExpedienteAbmComponent,
    //canActivate: [GuardGuard] 
  },
  /*{
    path: 'dashboard',
    //component: DashboardComponent, data :{ idPais :'1', idEstilo: '2', idMarca: '3', idCiudad: 4}
    component: DashboardComponent
  },
  {
    path: 'menu',
    component: LandingPageComponent
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
