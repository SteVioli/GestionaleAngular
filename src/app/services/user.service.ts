import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private httpOptions :HttpHeaders = new HttpHeaders({
      'Authorization': 'Bearer' + localStorage.getItem('token')
    })

  URL = "http://localhost:8080/easy/organico";
  //id= numero
  constructor(private http:HttpClient) { }

  getUserByUsername(username:string):Observable<User>{
    return this.http.get<User>(`${this.URL}/${username}`,{headers:this.httpOptions})
  }

  getAllUser():Observable<User[]>{
    return this.http.get<User[]>(`${this.URL}/all`,{headers:this.httpOptions})
  }

  deleteUserById(id:number){
    let idString = id.toString();
    return this.http.delete<User>(`${this.URL}/${idString}`, { headers: this.httpOptions });
  }

  deleteUserByUsername(username: string){

    return this.http.delete<User>(`${this.URL}/username=${username}`, { headers: this.httpOptions });
  }

}
