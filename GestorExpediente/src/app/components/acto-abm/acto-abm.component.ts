import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-acto-abm',
  templateUrl: './acto-abm.component.html',
  styleUrls: ['./acto-abm.component.css']
})
export class ActoAbmComponent implements OnInit{
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
    idActo: '',
    idSituacionRevista: '',
    fechaExpediente: '',
    firmadoSumario: false,
    firmadoLaborales: false,
    enviadoLaborales: false,
    avisado: false,
    observaciones: ''
  };

  constructor(private formBuilder: FormBuilder, public dialogoConfirmacion: MatDialog, 
    private serviceExpediente: ExpedienteService, private serviceActo: ActoService, private serviceCaratula: CaratulaService, private serviceSituacionRevista: SituacionRevistaService){
      this.formGroup = this.formBuilder.group({
        nombre: ['',[Validators.required]],      
        expediente1: ['',[Validators.required]],
        fecha: ['',],
        documento: ['',],
        caratula: ['',],
        acto: ['',],
        situacionRevista: ['',],
        fechaExpediente: ['',[Validators.required]],  
        firmadoSumario: ['',],
        firmadoLaborales: ['',],
        enviadoLaborales: ['',],
        avisado: ['',],
        observaciones: ['',],
      })


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
