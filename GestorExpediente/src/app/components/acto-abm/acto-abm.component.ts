import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Acto } from 'src/app/models/acto';
import { ActoService } from 'src/app/services/acto.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Component({
  selector: 'app-acto-abm',
  templateUrl: './acto-abm.component.html',
  styleUrls: ['./acto-abm.component.css']
})
export class ActoAbmComponent implements OnInit{
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  dataSource: any;
  nombreColumnas: string[] = ["nombre", "acciones"];
  formGroup: FormGroup;
  datos: Acto = {id: 0, nombre: ""};
  title = "";

  constructor(private servicioActo: ActoService, private formBuilder: FormBuilder,
     public spinnerService: SpinnerService, public refDialog: MatDialogRef<ActoAbmComponent>, public dialogoConfirmacion: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { acto: any; title: string; }) {
    
    this.title = "Nuevo Acto";

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
      this.servicioActo.actualizar(_edit).subscribe(
        result =>
        {
          this.refDialog.close(this.formGroup.value);                
          this.dialogoConfirmacion.open(DialogComponent, {
            width: '400px', data: {
              titulo: "Confirmación",
              mensaje: "Acto actualizado con éxito",
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
      this.servicioActo.nuevo(_edit).subscribe(
        result =>
        {
          this.refDialog.close(this.formGroup.value);
          this.dialogoConfirmacion.open(DialogComponent, {
            data: {
              titulo: "Confirmación",
              mensaje: "Acto ingresado con éxito",
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
