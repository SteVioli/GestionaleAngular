import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fattura } from '../_models/fattura.model';
import { Observable } from 'rxjs';
import { ArticoloOrdine } from '../_models/articolo-ordine.model';

@Injectable({
  providedIn: 'root'
})
export class FattureService {
URL = "http://localhost:8080/easy/fattura";

private httpOptions: HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })


  constructor(private http:HttpClient) { }

  getAllFatture():Observable<Fattura[]>{
    return this.http.get<Fattura[]>(`${this.URL}/all`, {headers: this.httpOptions})
  }

  getFatturaById(id: number):Observable<Fattura>{
    return this.http.get<Fattura>(`${this.URL}/${id}`, {headers: this.httpOptions})
  }

  getFatturaByCliente(nomeCliente: string):Observable<Fattura[]>{
    return this.http.get<Fattura[]>(`${this.URL}/cliente=${nomeCliente}`, {headers: this.httpOptions})
  }

  getUtenteFatture(username: string):Observable<Fattura[]>{
    return this.http.get<Fattura[]>(`${this.URL}/utente=${username}`, {headers: this.httpOptions})
  }


  creaFattura(idCliente: number, idUtente: number, idTrasportatore: number, lista : ArticoloOrdine[]){
    lista.filter((articolo: ArticoloOrdine) => articolo.quantitaOrdine > 0);
    let data = {
      idCliente,
      idUtente,
      idTrasportatore,
      lista
    }
    console.log(lista);
    return this.http.post(`${this.URL}/creazione`, data ,{headers: this.httpOptions})
  }

}
