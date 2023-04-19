import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/auth/auth.service.service';
import { FattureService } from 'src/app/services/fatture.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-operatore',
  templateUrl: './operatore.component.html',
  styleUrls: ['./operatore.component.scss']
})
export class OperatoreComponent implements OnInit{
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
  username: string = "";
  options = [
    'ROLE_USER',
    'ROLE_MODERATOR',
    'ROLE_ADMIN'
  ];
  ruoli = [];
  fatture: any = [];
  check: boolean = false;
  constructor(private userService: UserService,
              private authService: AuthService,
              private fattureService: FattureService,
              private router: Router){}

  ngOnInit(): void {
    this.authService.isAuthenticated();
    const token =JSON.parse(localStorage.getItem("currentUser")!);
    this.username = token.username;
    this.userService.getUserByUsername(this.username).subscribe(
    user => this.user = user
    );
    this.userService.getUserByUsername(this.username).subscribe(
      user => this.ruoli = user.roles
      );
    this.fattureService.getUtenteFatture(this.username).subscribe(
      fatture => this.fatture = fatture
    )
  }

  vediFattura(id: number){
    this.router.navigate([`/fattura/${id}`])
  }
  mostraFatture():boolean{
    if(this.check == true){
      return this.check = false;
    }else{
      return this.check = true;
    }
  }
}
