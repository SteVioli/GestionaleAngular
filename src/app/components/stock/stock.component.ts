import { Component, OnInit } from '@angular/core';
import { Articolo } from 'src/app/_models/articolo.model';
import { AuthServiceService } from 'src/app/auth/auth.service.service';
import { StockService } from 'src/app/services/stock.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
articoli: Articolo[] = [];
ruoli= [];
username: string = '';

  constructor(private articoloService: StockService,
              private userService: UserService,
              private authService: AuthServiceService){}

  ngOnInit(): void {
    this.authService.isAuthenticated();
    this.articoloService.getAllArticoli().subscribe(
      articoli => this.articoli = articoli
    );
    const tokenDue =JSON.parse(localStorage.getItem("currentUser")!);
    this.username = tokenDue.username;
    this.userService.getUserByUsername(this.username).subscribe(
      user => this.ruoli = user.roles
      );
  }
  cancellaArticolo(id: number){
    this.articoloService.cancellaArticoloById(id).subscribe(
      ele => console.log(ele + "articolo con id:" + id + " cancellato dal DB"));
      window.location.reload();
  }
}
