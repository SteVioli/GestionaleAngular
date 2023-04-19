import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  selectedValue:Array<string> = []

  username: string = "";
  user: any;
  testo: string = "";
  errorMessage: string = "";
  ruoli = [];
  registerSuccess: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService){}

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

  creaUtente(form:NgForm){
    this.authService.creaUtente(form.value).pipe(catchError((error: any, _caught: Observable<any>): Observable<any> => {
      console.log(error)
    this.errorMessage = error.error;
    console.error('There was an error!', error);
    return of();
  }))
  .subscribe((ele: any)=> {
    this.registerSuccess = true});
  // setTimeout(() => {
  //   window.location.reload();
  //     }, 3000);
  }
}
