import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { DialogComponent } from '../components/shared/dialog/dialog.component';
import { environment } from '../environment';
import { Expediente } from '../models/expediente';

@Injectable({
  providedIn: 'root'
})
export class ExpedienteService {
  apiUrl = environment.urlBase() + "Expediente/";  
  spinner = new BehaviorSubject<Boolean>(true);
  
  constructor(private http: HttpClient, public dialogoConfirmacion: MatDialog) { }

  public GetById(id: Number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "buscar/" + id);
  }

  public GetAll(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "listar");    
  }

  public GetAllPendientes(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "listarPendientes");    
  }

  public nuevo(element: Expediente): Observable<any> {    
    return this.http.post<Expediente>(this.apiUrl + "nuevo", element);
  }

  public actualizar(element: Expediente): Observable<Expediente>{
    return this.http.put<Expediente>(this.apiUrl + "actualizar", element);
  }

  public eliminarById(id: number): Observable<any>{
    return this.http.delete<any>(this.apiUrl + "eliminar/" + id);
  }

  public eliminar(id: number): Observable<any>{
    return this.http.delete<any>(this.apiUrl + "eliminar/" + id)
    .pipe(
      catchError(error => {
          let errorMsg: string;
          if (error.error instanceof ErrorEvent) {
              errorMsg = `Error: ${error.error}`;
              console.log(errorMsg);
          } else {
              errorMsg = this.getServerErrorMessage(error);
              console.log(errorMsg);
          }
          this.dialogoConfirmacion.open(DialogComponent, {
            data: {
              titulo: "Error",
              mensaje: errorMsg,
              icono: "warning",
              clase: "class-error"
            }
          })
          return errorMsg;
      })
    );
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {    
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.error}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 401: {
          return 'Acceso Denegado';
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            //return `Unknown Server Error: ${error.error}`;
            return `${error.error}`;
        }

    }
  }
}
