import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  token: string;
}

export interface UserSignUp {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  roles: [];
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private authStatusSource: Subject<boolean> = new Subject();
  public authStatus$: Observable<boolean> = this.authStatusSource.asObservable();
  private authSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  user$: Observable<any> = this.authSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map((user) => !!user));
  private httpOptions: HttpHeaders =  new HttpHeaders({
    Authorization: 'Bearer' + localStorage.getItem('token')
  });
  private apiUrl: string = 'http://localhost:8080/api/auth';
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser: string | null = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject(
      storedUser !== null ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

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

  creaUtente(user:User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`,user,{headers: this.httpOptions, responseType:'text'});
  }

  getToken(): any {
    const token = JSON.parse(localStorage.getItem("currentUser")!);
    return token.accessToken
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.updateAuthStatus(false);
  }

  isAuthenticated(): void {
    const storedUser: string | null = localStorage.getItem('currentUser');
    if (!storedUser) {
      this.router.navigate(['/login'])
    }
  }

  updateAuthStatus(status: boolean): void {
    this.authStatusSource.next(status);
  }

  isUserLoggedIn(): boolean {
    const user = localStorage.getItem('username');
    return user != null;
  }
}
