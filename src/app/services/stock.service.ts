import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Articolo } from '../_models/articolo.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  URL = "http://localhost:8080/easy/stock";
  private httpOptions: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })

  constructor(private http:HttpClient) { }

  getAllArticoli(): Observable<Articolo[]>{
  return this.http.get<Articolo[]>(`${this.URL}/all`, {headers:this.httpOptions})
  }

  trovaArticoloPerNome(nomeArticolo: string):Observable<Articolo>{
    return this.http.get<Articolo>(`${this.URL}/tipo=${nomeArticolo}`, {headers: this.httpOptions})
  }


  aggiungiQuantitaArticolo(id: number, quantita: number):Observable<Articolo>{
    //return this.http.put<Articolo>(`${this.URL}/modifica${id}/modifica${quantita}`, {headers: this.httpOptions})
    return this.http.put<Articolo>(`${this.URL}/modifica${id}/modifica${quantita}`, {headers: this.httpOptions})
  }

  creaArticolo(articolo: Articolo){
    return this.http.post(`${this.URL}/nuovo`,articolo,{headers:this.httpOptions})
  }

  cancellaArticoloById(id: number){
    return this.http.delete(`${this.URL}/${id}`, {headers: this.httpOptions})
  }


  private errors(err: any) {
    switch (err.error) {
        case "Fill required fields":
            return throwError('Compilare campi obbligatori');
            break;
        case "Article already exists":
            return throwError('Articolo già registrato');
            break;
        case "Article format is invalid":
            return throwError('Articolo scritto male');
            break;
        case "Cannot find article":
            return throwError('L\'articolo non esiste');
            break;
        default:
            return throwError('Errore nella chiamata');
            break
    }
  }
}
