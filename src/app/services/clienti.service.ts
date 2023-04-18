import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../_models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  private URL: string = "http://localhost:8080/easy/cliente";
  private httpOptions: HttpHeaders =  new HttpHeaders({
          'Authorization': 'Bearer' + localStorage.getItem('token')
  });

  constructor(private http: HttpClient) {}

  getAllClienti(): Observable<Cliente[]> {
    return this.http.get<Cliente[]> (`${this.URL}/all`, {headers: this.httpOptions});
  }

  cancellaClienteById(id: number){
    return this.http.delete(`${this.URL}/${id}`, {headers: this.httpOptions})
  }

  creaCliente(cliente: Cliente){
    return this.http.post(`${this.URL}/nuovo`,cliente,{headers: this.httpOptions})
  }
}
