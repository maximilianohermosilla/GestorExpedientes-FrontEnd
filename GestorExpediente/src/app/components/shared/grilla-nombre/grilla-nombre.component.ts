import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { MatSort, Sort } from '@angular/material/sort'
import { LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-grilla-nombre',
  templateUrl: './grilla-nombre.component.html',
  styleUrls: ['./grilla-nombre.component.css']
})
export class GrillaNombreComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() title: string="";
  @Input() icon: string="";
  @Input() data: any;
  @Output() btnAdd = new EventEmitter();
  @Output() btnUpdate = new EventEmitter();
  @Output() btnDelete = new EventEmitter();

  nombreColumnas: string[] = ["nombre", "acciones"];
  dataSource: any;  

  constructor(public spinnerService: SpinnerService, public dialog: MatDialog, public dialogoConfirmacion: MatDialog, private liveAnnouncer: LiveAnnouncer) {}

  ngOnInit(): void {
    this.spinnerService.show();
    setTimeout(() => {
      this.dataSource = new MatTableDataSource<any[]>(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.spinnerService.hide();
    }, 2000);
  }
  
  nuevo(){
    this.btnAdd.emit();
  }

  actualizar(element: any){
    this.btnUpdate.emit(element);
  }

  eliminar(element: any){
    this.btnDelete.emit(element);
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
