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
  nombreColumnas: string[] = ["fecha", "expediente", "caratula", "fechaExpediente", "nombre", "documento", "acto", "firmadoSumario", "firmadoLaborales", "enviadoLaborales", "avisado", "acciones"];
  title = "";

  constructor(private servicioExpediente: ExpedienteService, public dialog: MatDialog, public dialogoConfirmacion: MatDialog, private liveAnnouncer: LiveAnnouncer, public datePipe: DatePipe) { }

  ngOnInit(): void {
    this.servicioExpediente.GetAll().subscribe((rta: any[]) => {
      this.dataSource = new MatTableDataSource<any[]>(rta);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //console.log(rta);
    })
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
    this.servicioExpediente.GetById(event.id).subscribe((rta: Expediente) => { 
      const dialogRef = this.dialog.open(ExpedienteAbmComponent,{
        width: '640px',disableClose: false, data: {
          title: "Editar Expediente",
          estilo: rta
        } 
      });

      dialogRef.afterClosed().subscribe( res => {      
        this.ngOnInit();
      })
    });
  } 

  eliminar(expediente: Expediente){
    this.dialogoConfirmacion.open(DialogComponent, {
        data: `¿Está seguro de que desea eliminar ${expediente.nombre}?`
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
}
