import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Articolo } from 'src/app/_models/articolo.model';
import { AuthService } from 'src/app/auth/auth.service';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss']
})
export class GestioneComponent implements OnInit{
  articoli:Articolo[] = [];
  selectedValue: number = 0;
  testo: string = "INSERIMENTO ARTICOLO, in attesa..."


  constructor(private articoloService: StockService, private router: Router, private authService: AuthService){}



  ngOnInit(): void {
    this.authService.isAuthenticated();
    this.articoloService.getAllArticoli().subscribe(
      articoli => this.articoli = articoli
    );
  }

  onSubmit(form: NgForm): void {
    this.articoloService.aggiungiQuantitaArticolo(form.value.id, form.value.quantita).subscribe(
      (data) => {
        console.log(data),
        this.testo = "Stock aggiornato correttamente!",
        setTimeout(() => {
          window.location.reload()
        }, 3000);
      }
    );
  }
}

