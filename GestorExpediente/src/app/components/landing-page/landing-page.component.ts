import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/services/login.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TokenService } from 'src/app/services/token.service';
import { LoginComponent } from '../login/login.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  @Input() error?: string | null;
  @Output() submitEM = new EventEmitter();
  @Output() btnSubmit = new EventEmitter();
  formGroup: FormGroup;
  title = 'Expedientes';
  showFiller = false;
  isAdmin: boolean = false;
  userName = "";
  loginUsuario: Usuario = {
    Login: '',
    Password: ''
  };
  
  isLogged: boolean = false;
  isLoginFail = false;
  perfil: string = "";
  errMsj: string = "";

  constructor(private formBuilder: FormBuilder, private authService: LoginService, private route: Router, private tokenService: TokenService, 
    private spinnerService: SpinnerService, public dialogoConfirmacion: MatDialog, public dialog: MatDialog){

  this.formGroup = this.formBuilder.group({
    Login: ['',[Validators.required]],
    Password: ['',[Validators.required]]
    })  
  }

  submit() {
    if (this.formGroup.valid) {
      this.submitEM.emit(this.formGroup.value);
    }
  }

  ngOnInit(): void {
   /* if (this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.perfil = this.tokenService.getAuthorities();
    }*/
  }

  login(){
    const dialogRef = this.dialog.open(LoginComponent,{
      width: '640px',disableClose: false, data: {
        title: "Ingresar",        
      } 
    });
    dialogRef.afterClosed().subscribe( res => {
      setTimeout(() => {
        window.location.reload();            
        this.spinnerService.hide();
      }, 1000);
    })   
  }

  toggleLogin(){ 
    if(this.tokenService.getToken()){
      this.dialogoConfirmacion.open(ConfirmDialogComponent, {
        data: `¿Está seguro de que desea cerrar la sesión?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.spinnerService.show();
          this.userName = "";
          this.route.navigate(['menu']);
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
    }    
  }
}
