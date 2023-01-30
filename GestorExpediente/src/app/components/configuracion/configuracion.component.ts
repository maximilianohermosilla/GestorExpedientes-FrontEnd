import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Acto } from 'src/app/models/acto';
import { Caratula } from 'src/app/models/caratula';
import { SituacionRevista } from 'src/app/models/situacionRevista';
import { ActoService } from 'src/app/services/acto.service';
import { CaratulaService } from 'src/app/services/caratula.service';
import { SituacionRevistaService } from 'src/app/services/situacion-revista.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ActoAbmComponent } from '../acto-abm/acto-abm.component';
import { CaratulaAbmComponent } from '../caratula-abm/caratula-abm.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { SituacionRevistaAbmComponent } from '../situacion-revista-abm/situacion-revista-abm.component';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent {
  listaActos: Acto[] = [];
  listaCaratulas: Caratula[] = [];
  listaSituaciones: SituacionRevista[] = [];
  
  constructor(public dialogoConfirmacion: MatDialog, private route: ActivatedRoute,
    private serviceActo: ActoService, private serviceCaratula: CaratulaService, private serviceSituacionRevista: SituacionRevistaService,
    public spinnerService: SpinnerService, public dialog: MatDialog){}
  ngOnInit(): void {    
    this.listaCaratulas = [];
    this.listaSituaciones = [];
    this.listarActos();
    this.listarCaratulas();
    this.listarSituaciones(); 
    setTimeout(() => {
      this.spinnerService.show();  
    }, 1000);    
  }

  listarActos(){
    this.serviceActo.GetAll().subscribe((rta: Acto[]) => {
      this.listaActos = rta;    
    });
  }

  listarCaratulas(){
    this.serviceCaratula.GetAll().subscribe((rta: Caratula[]) => {
      this.listaCaratulas = rta;
    });
  }

  listarSituaciones(){
    this.serviceSituacionRevista.GetAll().subscribe((rta: SituacionRevista[]) => {
      this.listaSituaciones = rta;  
    });
  }

  //AGREGAR
  openDialogCaratula(){
    const dialogRef = this.dialog.open(CaratulaAbmComponent,{
      width: '640px', minWidth: '340px',disableClose: false, data: {
        title: "Nueva Caratula",
        caratula: null
      } 
    });

    dialogRef.afterClosed().subscribe( res => {
      if (res && res != true){
        window.location.reload();
      }
    })
  }

  openDialogActo(){
    const dialogRef = this.dialog.open(ActoAbmComponent,{
      width: '640px', minWidth: '340px',disableClose: false, data: {
        title: "Nuevo Acto",
        acto: null
      } 
    });

    dialogRef.afterClosed().subscribe( res => {
      if (res && res != true){
        window.location.reload();
      }
    })
  }

  openDialogSituacion(){
    const dialogRef = this.dialog.open(SituacionRevistaAbmComponent,{
      width: '640px', minWidth: '340px',disableClose: false, data: {
        title: "Nueva Situacion de Revista",
        situacion: null
      } 
    });

    dialogRef.afterClosed().subscribe( res => {
      if (res && res != true){
        window.location.reload();
      }
    })
  }

  //ACTUALIZAR
  openEditCaratula(element: any){
    this.serviceCaratula.GetById(element.id).subscribe((rta: any) => { 
      const dialogRef = this.dialog.open(CaratulaAbmComponent,{
        width: '640px', minWidth: '340px', disableClose: false, data: {
          title: "Editar Caratula",
          caratula: rta
        } 
      });

      dialogRef.afterClosed().subscribe( res => {
        if (res && res != true){
          window.location.reload();
        }
      })
    });
  }

  openEditActo(element: any){
    this.serviceActo.GetById(element.id).subscribe((rta: any) => { 
      const dialogRef = this.dialog.open(ActoAbmComponent,{
        width: '640px', minWidth: '340px', disableClose: false, data: {
          title: "Editar Acto",
          acto: rta
        } 
      });

      dialogRef.afterClosed().subscribe( res => {
        if (res && res != true){
          window.location.reload();
        }
      })
    });
  }

  openEditSituacion(element: any){
    this.serviceSituacionRevista.GetById(element.id).subscribe((rta: any) => { 
      const dialogRef = this.dialog.open(SituacionRevistaAbmComponent,{
        width: '640px', minWidth: '340px', disableClose: false, data: {
          title: "Editar Situacion de Revista",
          situacion: rta
        } 
      });

      dialogRef.afterClosed().subscribe( res => {
        if (res && res != true){
          window.location.reload();
        }
      })
    });
  }


  //ELIMINAR
  openDeleteCaratula(element: any){
    this.dialogoConfirmacion.open(ConfirmDialogComponent, {
      data: `¿Está seguro de que desea eliminar ${element.nombre}?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.serviceCaratula.eliminar(element.id).subscribe(result =>
          {this.ngOnInit();}
        );
      } else {
      }
    });
  }

  openDeleteActo(element: any){
    this.dialogoConfirmacion.open(ConfirmDialogComponent, {
      data: `¿Está seguro de que desea eliminar ${element.nombre}?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.serviceActo.eliminar(element.id).subscribe(result =>
          {this.ngOnInit();}
        );
      } else {
      }
    });
  }

  openDeleteSituacion(element: any){    
    this.dialogoConfirmacion.open(ConfirmDialogComponent, {
      data: `¿Está seguro de que desea eliminar ${element.nombre}?`
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        this.serviceSituacionRevista.eliminar(element.id).subscribe(result =>
          {this.ngOnInit();}
        );
      } else {
      }
    });
  }
}
