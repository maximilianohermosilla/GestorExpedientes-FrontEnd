import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable } from 'rxjs';
import { DialogComponent } from '../components/shared/dialog/dialog.component';
import { environment } from '../environment';
import { Acto } from '../models/acto';

@Injectable({
  providedIn: 'root'
})
export class ActoService {
  apiUrl = environment.urlBase() + "Acto/";
  
  constructor(private http: HttpClient, public dialogoConfirmacion: MatDialog) { }

  public GetById(id: Number): Observable<any> {
    return this.http.get<any>(this.apiUrl + "buscar/" + id);
  }

  public GetAll(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + "listar");    
  }
  
  public nuevo(element: Acto): Observable<any> {
    return this.http.post<Acto>(this.apiUrl + "nuevo", element);
  }

  public actualizar(element: Acto): Observable<Acto>{
    return this.http.put<Acto>(this.apiUrl + "actualizar", element);
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
          } else {
              errorMsg = this.getServerErrorMessage(error);
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
