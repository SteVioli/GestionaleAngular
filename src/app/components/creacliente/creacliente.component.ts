import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientiService } from 'src/app/services/clienti.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-creacliente',
  templateUrl: './creacliente.component.html',
  styleUrls: ['./creacliente.component.scss']
})
export class CreaclienteComponent implements OnInit{
  username: string = "";
  ruoli = [];
  errorMessage: string = "";
  registerSuccess: boolean = false;

  constructor(private clienteService: ClientiService,
              private authService: AuthService,
              private userService: UserService,
              private router: Router){}

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

  creaCliente(form: NgForm){
    console.log(form.value);
    this.clienteService.creaCliente(form.value).pipe(catchError((error: any, _caught: Observable<any>): Observable<any> => {
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


