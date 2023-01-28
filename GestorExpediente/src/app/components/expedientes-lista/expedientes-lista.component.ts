import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Expediente } from 'src/app/models/expediente';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { ExpedienteAbmComponent } from '../expediente-abm/expediente-abm.component';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { DatePipe } from '@angular/common';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-expedientes-lista',
  templateUrl: './expedientes-lista.component.html',
  styleUrls: ['./expedientes-lista.component.css']
})
export class ExpedientesListaComponent {
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  dataSource: any;
  nombreColumnas: string[] = ["fecha", "expediente", "caratula", "fechaExpediente", "nombre", "documento", "acto",
   "situacionRevista", "firmadoSumario", "firmadoLaborales", "enviadoLaborales", "avisado", "acciones"];
  title = "";
  filterPendientes: boolean = false;

  constructor(private servicioExpediente: ExpedienteService, public dialog: MatDialog, public dialogoConfirmacion: MatDialog, private liveAnnouncer: LiveAnnouncer, public datePipe: DatePipe
    , private router: Router) { }

  ngOnInit(): void {
    this.servicioExpediente.GetAll().subscribe((rta: any[]) => {
      this.dataSource = new MatTableDataSource<any[]>(rta);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //console.log(rta);
    })    
  }

  nuevoExpediente(){
    this.router.navigate(['expediente']);
  }

  openDialog(): void {  
    const dialogRef = this.dialog.open(ExpedienteAbmComponent,{
      width: '640px',disableClose: false, data: {
        title: "Nuevo Expediente",
        estilo: null
      } 
    });

    dialogRef.afterClosed().subscribe( res => {
      this.ngOnInit();
    })
  }

  ver(event: any) {
    console.log
    this.router.navigate(['expediente'], { queryParams: { idExpediente: event.id } });
  } 

  eliminar(expediente: Expediente){
    this.dialogoConfirmacion.open(ConfirmDialogComponent, {
        data: `¿Está seguro de que desea eliminar ${expediente.expediente1}?`
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.servicioExpediente.eliminar(expediente.id).subscribe(result =>
            {this.ngOnInit();}
          );
        } else {
        }
      });      
  }  

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sort: Sort){
    if (sort.direction){
      this.liveAnnouncer.announce('Sorted${sort.direction}ending');
    }
    else{
      this.liveAnnouncer.announce('sorting cleared');
    }
  }

  onChangePendientes(){
    this.filterPendientes = !this.filterPendientes;
    console.log(this.filterPendientes);
    if (this.filterPendientes == true){
      this.servicioExpediente.GetAllPendientes().subscribe((rta: any[]) => {
        this.dataSource = new MatTableDataSource<any[]>(rta);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }) 
    }
    else{
      this.servicioExpediente.GetAll().subscribe((rta: any[]) => {
        this.dataSource = new MatTableDataSource<any[]>(rta);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }) 
    }
  }

  onChangeFirmadoSum(event: Expediente){
    event.firmadoSumario = !event.firmadoSumario;
    this.updateExpediente(event);
  }

  onChangeFirmadoLab(event: Expediente){
    event.firmadoLaborales = !event.firmadoLaborales;
    this.updateExpediente(event);
  }

  onChangeEnviadoLab(event: Expediente){
    event.enviadoLaborales = !event.enviadoLaborales;
    this.updateExpediente(event);
  }

  onChangeAvisado(event: Expediente){
    event.avisado = !event.avisado;
    this.updateExpediente(event);
  }

  updateExpediente(event: any){
    this.servicioExpediente.actualizar(event).subscribe(result =>
      {         
        this.dialogoConfirmacion.open(DialogComponent, {
          width: '400px', data: {
            titulo: "Confirmación",
            mensaje: "Expediente actualizado con éxito",
            icono: "check_circle",
            clase: "class-success"
          }
        });          
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
        console.log(error);
      }
    );
  }
}
