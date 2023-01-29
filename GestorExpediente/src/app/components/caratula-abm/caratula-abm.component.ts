import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CaratulaService } from 'src/app/services/caratula.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Acto } from 'src/app/models/acto';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-caratula-abm',
  templateUrl: './caratula-abm.component.html',
  styleUrls: ['./caratula-abm.component.css']
})
export class CaratulaAbmComponent {
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  dataSource: any;
  nombreColumnas: string[] = ["nombre", "acciones"];
  formGroup: FormGroup;
  datos: Acto = {id: 0, nombre: ""};
  title = "";

  constructor(private servicioCaratula: CaratulaService, private formBuilder: FormBuilder,
     public spinnerService: SpinnerService, public refDialog: MatDialogRef<CaratulaAbmComponent>, public dialogoConfirmacion: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { acto: any; title: string; }) {
    
    this.title = "Nueva Caratula";

    if (data.acto != undefined) {
      this.datos = data.acto;
      this.title = data.title;
    }

    this.formGroup = this.formBuilder.group({
      nombre: ['',[Validators.required]],  
    })
  }
  
  ngOnInit(): void {
    
  }

  save(){
    let _edit: Acto = {id: this.datos.id, nombre: this.datos.nombre};
    if (this.datos.id > 0){
      this.servicioCaratula.actualizar(_edit).subscribe(
        result =>
        {
          this.refDialog.close(this.formGroup.value);                
          this.dialogoConfirmacion.open(DialogComponent, {
            width: '400px', data: {
              titulo: "Confirmación",
              mensaje: "Carátula actualizada con éxito",
              icono: "check_circle",
              clase: "class-success"
            }
          });
          this.spinnerService.hide();
        },
        error => 
        {
          if (error.status == 401 || error.status == 403){
            error.error = "Usuario no autorizado";
          }
          this.dialogoConfirmacion.open(DialogComponent, {
            data: {
              titulo: "Error",
              mensaje: error.error,
              icono: "warning",
              clase: "class-error"
            }
          })
          this.refDialog.close();
          console.log(error);
          this.spinnerService.hide();
        }          
      );
    }
    else{     
      this.servicioCaratula.nuevo(_edit).subscribe(
        result =>
        {
          this.refDialog.close(this.formGroup.value);
          this.dialogoConfirmacion.open(DialogComponent, {
            data: {
              titulo: "Confirmación",
              mensaje: "Carátula ingresada con éxito",
              icono: "check_circle",
              clase: "class-success"
            }
          });
          this.spinnerService.hide();
        },
        error => {
          if (error.status == 401 || error.status == 403){
            error.error = "Usuario no autorizado";
          }
          this.dialogoConfirmacion.open(DialogComponent, {
            data: {
              titulo: "Error",
              mensaje: error.error,
              icono: "warning",
              clase: "class-error"
            }
          })
          this.refDialog.close();
          console.log(error);
          this.spinnerService.hide();
        }
      );
    }
  }

}
