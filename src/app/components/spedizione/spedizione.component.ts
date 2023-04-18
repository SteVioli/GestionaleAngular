import { Component, OnInit } from '@angular/core';
import { Articolo } from 'src/app/_models/articolo.model';
import { ArticoloOrdine } from 'src/app/_models/articolo-ordine.model';
import { Cliente } from 'src/app/_models/cliente.model';
import { Trasportatore } from 'src/app/_models/trasportatore.model';
import { User } from 'src/app/_models/user.model';
import { ClientiService } from 'src/app/services/clienti.service';
import { StockService } from 'src/app/services/stock.service';
import { TrasportatoreService } from 'src/app/services/trasportatore.service';
import { UserService } from 'src/app/services/user.service';
import { FattureService } from 'src/app/services/fatture.service';
import { Fattura } from 'src/app/_models/fattura.model';
import { AuthServiceService } from 'src/app/auth/auth.service.service';

@Component({
  selector: 'app-spedizione',
  templateUrl: './spedizione.component.html',
  styleUrls: ['./spedizione.component.scss']
})
export class SpedizioneComponent implements OnInit{
  articoliOrdine: ArticoloOrdine[] = [];
  clienti: Cliente[] = [];
  trasportatori: Trasportatore[] = [];
  fattura?: Fattura;

  user:User ={
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
  testo: string = "";
  clienteId: number = 0;
  trasportatoreId: number = 0;

  constructor(private clientiService: ClientiService,
              private trasportatoreService: TrasportatoreService,
              private userService: UserService,
              private stockService: StockService,
              private fatturaService: FattureService,
              private authService: AuthServiceService) {}

  creaFattura(){
    this.fatturaService.creaFattura(this.clienteId,this.user.id,this.trasportatoreId,this.articoliOrdine).subscribe(ele => console.log(ele));
    this.testo = "Fattura creata correttamente";
     setTimeout(() => {
       window.location.reload()
     }, 3000);
  }

  ngOnInit(): void {
    this.authService.isAuthenticated();
    this.stockService.getAllArticoli().subscribe(
      (articoli: Articolo[]) => {
        articoli.forEach((articolo: Articolo) => {
          this.articoliOrdine.push(new ArticoloOrdine(articolo))
        });
    });
    this.clientiService.getAllClienti().subscribe(
      (clienti: Cliente[]) => this.clienti = clienti
    );
    this.trasportatoreService.getAllTrasportatori().subscribe(
      (trasportatori: Trasportatore[]) => this.trasportatori = trasportatori
    );
    const token = JSON.parse(localStorage.getItem("currentUser")!);
    this.username = token.username;
    this.userService.getUserByUsername(this.username).subscribe(
    (user: User) => this.user = user
    );
  }
}
