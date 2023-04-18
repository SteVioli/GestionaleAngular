import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../auth.service.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  @ViewChild('myModalClose') modalClose!: ElementRef;

  isLogged = true;
  username: string = "";

  constructor(private authService: AuthServiceService,
              private router: Router) { }

  ngOnInit(): void { }

  onSubmit(form: NgForm): void {
    this.authService.login(form.value).subscribe(
      (data) => {
        console.log('success', data);
        this.username = data.username;
        this.router.navigate(["/home"])
      },
      (error) => {
        console.log('Submit non andato a buon fine', error);
        this.isLogged = false;
      }
    );
  }


  reloadPage() {
    window.location.reload();
  }
}
