import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthServiceService } from 'src/app/auth/auth.service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  starterDate = new Date();
  username="";
  user: User = {
    id: 0,
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    fatture: [],
    roles: []
  };
  ruoli = [];
  constructor(private authService: AuthServiceService,
              private router: Router,
              private userService:UserService) {}

  ngOnInit(): void {
    const token =JSON.parse(localStorage.getItem("currentUser")!);
    this.username = token.username;
    this.userService.getUserByUsername(this.username);
    this.userService.getUserByUsername(this.username).subscribe(
      user => this.ruoli = user.roles
      );
  }
  loggedOut():void{
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
