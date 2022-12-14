import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iasistencias } from '../interfaces/asistencias';
import { environment } from 'src/environments/environment';
import { Iasistencia } from '../interfaces/asistencia';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private http:HttpClient) { }

  verAsistencia():Observable<Iasistencias>{
    return this.http.get<Iasistencias>(`${environment.apiURL}/asistencia`)
  }

  addAsistencia(newAsistencia: Iasistencia):Observable<Iasistencia>{
    return this.http.post<Iasistencia>(`${environment.apiURL}/asistencia`,newAsistencia)
  }
}
 