import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { Acto } from 'src/app/models/acto';
import { Caratula } from 'src/app/models/caratula';
import { Expediente } from 'src/app/models/expediente';
import { SituacionRevista } from 'src/app/models/situacionRevista';
import { ActoService } from 'src/app/services/acto.service';
import { CaratulaService } from 'src/app/services/caratula.service';
import { ExpedienteService } from 'src/app/services/expediente.service';
import { SituacionRevistaService } from 'src/app/services/situacion-revista.service';

@Component({
  selector: 'app-expediente-abm',
  templateUrl: './expediente-abm.component.html',
  styleUrls: ['./expediente-abm.component.css']
})
export class ExpedienteAbmComponent {
  dataSource: any;
  nombreColumnas: string[] = ["nombre", "acciones"];
  formGroup: FormGroup;
  title = "";  
  listaActos: Acto[] = [];
  listaCaratulas: Caratula[] = [];
  listaSituaciones: SituacionRevista[] = [];

  datos: Expediente = {
    id: 0,
    nombre: '',
    expediente1: '',
    fecha: '',
    documento: '',
    idCaratula: 0,
    idActo: 0,
    idSituacionRevista: 0,
    fechaExpediente: '',
    firmadoSumario: false,
    firmadoLaborales: false,
    enviadoLaborales: false,
    avisado: false,
    observaciones: ''
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  constructor(private formBuilder: FormBuilder, public dialogoConfirmacion: MatDialog, private dateAdapter: DateAdapter<Date>,
    private serviceExpediente: ExpedienteService, private serviceActo: ActoService, private serviceCaratula: CaratulaService, private serviceSituacionRevista: SituacionRevistaService){
      this.formGroup = this.formBuilder.group({
        nombre: ['',[Validators.required]],      
        expediente1: ['',[Validators.required]],
        fecha: ['',],
        documento: ['',],
        caratula: ['',[Validators.required]],
        acto: ['',],
        situacionRevista: ['',],
        fechaExpediente: ['',],  
        firmadoSumario: ['',],
        firmadoLaborales: ['',],
        enviadoLaborales: ['',],
        avisado: ['',],
        observaciones: ['',],
      })
      this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

  }
  ngOnInit(): void {
    this.listarActos();
    this.listarCaratulas();
    this.listarSituaciones();
  }

  listarActos(){
    this.serviceActo.GetAll().subscribe((rta: Acto[]) => {
      this.listaActos = rta;    
      console.log(this.listaActos);
    });
  }

  listarCaratulas(){
    this.serviceCaratula.GetAll().subscribe((rta: Caratula[]) => {
      this.listaCaratulas = rta;  
      console.log(this.listaCaratulas);  
    });
  }

  listarSituaciones(){
    this.serviceSituacionRevista.GetAll().subscribe((rta: SituacionRevista[]) => {
      this.listaSituaciones = rta;  
      console.log(this.listaSituaciones);  
    });
  }

  save(){

  }

  
}
