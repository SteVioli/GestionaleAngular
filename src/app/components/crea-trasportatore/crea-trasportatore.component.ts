import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth.service.service';
import { TrasportatoreService } from 'src/app/services/trasportatore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crea-trasportatore',
  templateUrl: './crea-trasportatore.component.html',
  styleUrls: ['./crea-trasportatore.component.scss']
})
export class CreaTrasportatoreComponent implements OnInit{
  username: string = "";
  ruoli = [];
  errorMessage: string = "";
  registerSuccess: boolean = false;

  constructor(private trasportatoreService: TrasportatoreService,
              private authService: AuthServiceService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated();
    const token =JSON.parse(localStorage.getItem("currentUser")!);
    this.username = token.username;
    this.userService.getUserByUsername(this.username);
    this.userService.getUserByUsername(this.username).subscribe(
      (user) => {
        this.ruoli = user.roles;
        if(this.ruoli.length < 3){
          this.router.navigate(['/home'])
        }},);
  }


  creaTrasportatore(form: NgForm){
    this.trasportatoreService.creaTrasportatore(form.value).pipe(catchError((error: any, _caught: Observable<any>): Observable<any> => {
    this.errorMessage = error.error;
    console.error('There was an error!', error);
    return of();
  }))
  .subscribe((ele: any)=> {
    this.registerSuccess = true;});
    setTimeout(() => {
      window.location.reload()
    }, 3000);
  }
}
