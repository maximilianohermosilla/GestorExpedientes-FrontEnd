import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { DialogComponent } from '../shared/dialog/dialog.component';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import 'moment/locale/ja';
import 'moment/locale/fr';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { ActoAbmComponent } from '../acto-abm/acto-abm.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CaratulaAbmComponent } from '../caratula-abm/caratula-abm.component';
import { SituacionRevistaAbmComponent } from '../situacion-revista-abm/situacion-revista-abm.component';

@Component({
  selector: 'app-expediente-abm',
  templateUrl: './expediente-abm.component.html',
  styleUrls: ['./expediente-abm.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ExpedienteAbmComponent {
  dataSource: any;
  nombreColumnas: string[] = ["nombre", "acciones"];
  formGroup: FormGroup;
  title = "Nuevo Expediente";  
  idExpediente: number = 0;
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
    idActo: undefined,
    idSituacionRevista: undefined,
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

  constructor(private formBuilder: FormBuilder, public dialogoConfirmacion: MatDialog, private dateAdapter: DateAdapter<Date>, public datePipe: DatePipe, private route: ActivatedRoute,
    private serviceExpediente: ExpedienteService, private serviceActo: ActoService, private serviceCaratula: CaratulaService, private serviceSituacionRevista: SituacionRevistaService,
    private router: Router, public spinnerService: SpinnerService,
      @Inject(MAT_DATE_LOCALE) private _locale: string){
      this._locale = 'fr';
      this.dateAdapter.setLocale(this._locale);
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
    this.route.queryParams.subscribe(params => {
      this.idExpediente = Number(params['idExpediente']) || 0;
    });
    if (this.idExpediente > 0){
      this.serviceExpediente.GetById(this.idExpediente).subscribe((rta: any) => {
        
        if(rta.id > 0){
          this.title = "Editar Expediente";
          this.datos.id = rta.id;
          this.datos.nombre = rta.nombre;
          this.datos.expediente1 = rta.expediente1,
          this.datos.fecha = rta.fecha;
          this.datos.documento = rta.documento;
          this.datos.idCaratula = rta.idCaratula;
          this.datos.idActo = rta.idActo;
          this.datos.idSituacionRevista = rta.idSituacionRevista;
          this.datos.fechaExpediente = rta.fechaExpediente;
          this.datos.firmadoSumario = rta.firmadoSumario;
          this.datos.firmadoLaborales = rta.firmadoLaborales;
          this.datos.enviadoLaborales = rta.enviadoLaborales;
          this.datos.avisado = rta.avisado;
          this.datos.observaciones = rta.observaciones;
        }
        
      });
    }
    else{
      this.title = "Nuevo Expediente";
    }
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

  save(){
    let currentDate = new Date();
    const currentDateFormatted = this.datePipe.transform(currentDate, 'yyyy-MM-dd');
    console.log(currentDateFormatted);
    let _edit: Expediente = {
      id: this.datos.id,
      nombre: this.datos.nombre,
      expediente1: this.datos.expediente1,
      fecha: currentDateFormatted!,
      documento: this.datos.documento,
      idCaratula: this.datos.idCaratula,
      idActo: this.datos.idActo != '0'? this.datos.idActo: undefined,
      idSituacionRevista: this.datos.idSituacionRevista != '0'? this.datos.idSituacionRevista: undefined,
      fechaExpediente: this.datos.fechaExpediente == ''? '1900-01-01': this.datos.fechaExpediente,
      firmadoSumario: this.datos.firmadoSumario,
      firmadoLaborales: this.datos.firmadoLaborales,
      enviadoLaborales: this.datos.enviadoLaborales,
      avisado: this.datos.avisado,
      observaciones: this.datos.observaciones
    };
    console.log(_edit);
    if (this.datos.id > 0){

      this.serviceExpediente.actualizar(_edit).subscribe(result =>
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
    else{   
      
      this.serviceExpediente.nuevo(_edit).subscribe(result =>
        {
          this.dialogoConfirmacion.open(DialogComponent, {
            data: {
              titulo: "Confirmación",
              mensaje: "Expediente ingresado con éxito",
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

  cancel(){
    this.router.navigate(['expedientes']);
  }

  openDialog(tipo: string): void {        
    switch (tipo) {
      case 'caratula':
         this.openABMCaratula();
        break;
      case 'acto':
         this.openABMActo();
      break;
      case 'situacion':
         this.openABMSituacion();
      break;
      default:        
        break;
    }    
  }

  openABMCaratula(){
    const dialogRef = this.dialogoConfirmacion.open(CaratulaAbmComponent,{
      width: '640px', minWidth: '340px',disableClose: false, data: {
        title: "Nueva Caratula",
        acto: null
      } 
    });

    dialogRef.afterClosed().subscribe( res => {
      this.listarCaratulas();
    })
  }

  openABMActo(){
    const dialogRef = this.dialogoConfirmacion.open(ActoAbmComponent,{
      width: '640px', minWidth: '340px',disableClose: false, data: {
        title: "Nuevo Acto",
        acto: null
      } 
    });

    dialogRef.afterClosed().subscribe( res => {
      this.listarActos();
    })
  }

  openABMSituacion(){
    const dialogRef = this.dialogoConfirmacion.open(SituacionRevistaAbmComponent,{
      width: '640px', minWidth: '340px',disableClose: false, data: {
        title: "Nueva Situación de Revista",
        acto: null
      } 
    });

    dialogRef.afterClosed().subscribe( res => {
      this.listarSituaciones();
    })
  }
}
