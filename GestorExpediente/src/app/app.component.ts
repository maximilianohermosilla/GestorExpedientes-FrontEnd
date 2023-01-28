import { ChangeDetectorRef, Component } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { Navitem } from './models/navitem';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/shared/dialog/dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Expedientes';
  showFiller = false;
  isAdmin: boolean = false;
  mobileQuery: MediaQueryList;
  fillerNav: Navitem[] = [];
  navitem: Navitem = { nombre: "", routerlink: "", icon: "" };
  //fillerNav = Array.from({length: 6}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;
  userName: string = "";
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, public dialog: MatDialog, public dialogoConfirmacion: MatDialog) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void{    
    this.isAdmin  = true;
    this.fillerNav.push({nombre: "Inicio",routerlink: "menu",icon: "home"}); 
    if (this.isAdmin) {
      this.userName = "Administrador"
      this.fillerNav.push({nombre: "Expedientes",routerlink: "expedientes",icon: "inventory"});       
    }
    this.fillerNav.push({nombre: "Búsquedas",routerlink: "dashboard",icon: "search"}); 
    this.fillerNav.push({nombre: "Reportes",routerlink: "reportes",icon: "leaderboard"}); 
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  login(){
    /*const dialogRef = this.dialog.open(LoginComponent,{
      width: '640px',disableClose: false, data: {
        title: "Ingresar",        
      } 
    });
    dialogRef.afterClosed().subscribe( res => {
      setTimeout(() => {
        window.location.reload();            
        this.spinnerService.hide();
      }, 1000);
    }) */  
  }

  toggleLogin(){ 
   /* if(this.tokenService.getToken()){
      this.dialogoConfirmacion.open(ConfirmDialogComponent, {
        data: `¿Está seguro de que desea cerrar la sesión?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.spinnerService.show();
          this.userName = "";
          this.router.navigate(['menu']);
          this.dialogoConfirmacion.open(DialogComponent, {
            data: {
              titulo: "Confirmación",
              mensaje: "Cierre de sesión exitoso",
              icono: "check_circle",
              clase: "class-success"
            }
          });
          this.spinnerService.show();
          this.tokenService.logOut();          
          setTimeout(() => {
            window.location.reload();            
          }, 1000);
        }
      });      
    }
    else{
      this.spinnerService.hide();
      this.login();
    }   */ 
  }
}