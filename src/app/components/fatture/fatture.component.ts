import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/_models/cliente.model';
import { AuthService } from 'src/app/auth/auth.service';
import { ClientiService } from 'src/app/services/clienti.service';
import { FattureService } from 'src/app/services/fatture.service';


@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit{
  fatture:any;
  nomeCliente: string = '';
  clienti:Cliente[] = [];

  constructor(private fattureService: FattureService,
              private authService: AuthService,
              private router: Router,
              private clientiService: ClientiService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated();
    this.fattureService.getAllFatture().subscribe(
    fatture => this.fatture = fatture);
    this.clientiService.getAllClienti().subscribe(
      clienti => this.clienti = clienti
    )
  }
  vediFattura(id: number){
    this.router.navigate([`/fattura/${id}`])
  }
  ricarica(){
     window.location.reload()
  }
  filtraFatturaPerCliente(nomeCliente: string){
    this.fattureService.getFatturaByCliente(nomeCliente).subscribe(
      fatture => this.fatture = fatture)
    }
}
