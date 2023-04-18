import { Component, OnInit } from '@angular/core';
import { Trasportatore } from 'src/app/_models/trasportatore.model';
import { AuthServiceService } from 'src/app/auth/auth.service.service';
import { TrasportatoreService } from 'src/app/services/trasportatore.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trasportatori',
  templateUrl: './trasportatori.component.html',
  styleUrls: ['./trasportatori.component.scss']
})
export class TrasportatoriComponent implements OnInit{
trasportatore: Trasportatore | undefined;
trasportatori: Trasportatore[] = [];
ruoli= [];
username: string = '';
  constructor(private trasportatoreService: TrasportatoreService,
              private userService: UserService,
              private authService: AuthServiceService){}

  ngOnInit(): void {
    this.authService.isAuthenticated();
    this.trasportatoreService.getAllTrasportatori().subscribe(
      trasportatori => this.trasportatori = trasportatori
    );
    const tokenDue =JSON.parse(localStorage.getItem("currentUser")!);
    this.username = tokenDue.username;
    this.userService.getUserByUsername(this.username).subscribe(
      user => this.ruoli = user.roles
      );
  }
  cancellaTrasportatore(id: number){
  this.trasportatoreService.cancellaTrasportatoreById(id).subscribe(data => console.log("Trasportatore cancellato correttamente"))
  window.location.reload()
  }

}
