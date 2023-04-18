import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, map, throwError } from 'rxjs';
import { Router } from '@angular/router';


export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface UserSignUp{
  name:string;
  lastname:string;
  username:string;
  email:string;
  password:string;
  roles?:[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  private authStatusSource = new Subject<boolean>();
  public authStatus$ = this.authStatusSource.asObservable();

  private httpOptions: HttpHeaders =  new HttpHeaders({
    'Authorization': 'Bearer' + localStorage.getItem('token')
  });

  private apiUrl = 'http://localhost:8080/api/auth';

  isLoggedIn = false;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private authSubject = new BehaviorSubject<any>(null);

  user$ = this.authSubject.asObservable();
  isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(data: { username: string; password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, data).pipe(
      map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.updateAuthStatus(true);
          return user;
      })
    );
  }

  creaUtente(user:User){
    return this.http.post(`${this.apiUrl}/register`,user,{headers: this.httpOptions, responseType:'text'});
  }

  getToken(){
    const token =JSON.parse(localStorage.getItem("currentUser")!);
    return token.accessToken
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.updateAuthStatus(false);
  }

  isAuthenticated(){
    const storedUser = localStorage.getItem('currentUser');
    if(!storedUser){
      this.router.navigate(['/login'])
    }
  }

  updateAuthStatus(status: boolean): void {
    this.authStatusSource.next(status);
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('username')
    if(user != null){

      return true
    }
    return false
  }

  private errors(err: any) {
    switch (err.error) {
      case "Email and password are required":

        throw new Error('Email e password sono obbligatorie');
        break;
      case "Email already exists":
        return throwError('Utente già registrato');
        break;
      case "Email format is invalid":
        return throwError('Email scritta male');
        break;
      case "Cannot find user":
        return throwError('L\'utente non esiste');
        break;
      default:
        return throwError('Errore nella chiamata');
        break
    }
  }

}
