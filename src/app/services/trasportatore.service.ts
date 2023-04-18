import { Injectable } from '@angular/core';
import { Trasportatore } from '../_models/trasportatore.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrasportatoreService {
  URL = "http://localhost:8080/easy/trasportatore";
  private httpOptions : HttpHeaders = new HttpHeaders({
    'Authorization': 'Bearer' + localStorage.getItem('token')
  })

  constructor(private http: HttpClient) {}

  getAllTrasportatori(): Observable<Trasportatore[]>{
    return this.http.get<Trasportatore[]>(`${this.URL}/all`, {headers: this.httpOptions})
  }

  cancellaTrasportatoreById(id: number){
    return this.http.delete(`${this.URL}/cancella${id}`, {headers: this.httpOptions})
  }

  creaTrasportatore(trasportatore: Trasportatore){
    return this.http.post(`${this.URL}/nuovo`, trasportatore, {headers: this.httpOptions,responseType:'text'})
  }
}
