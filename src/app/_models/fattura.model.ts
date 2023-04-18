import { Articolo } from "./articolo.model";
import { ArticoloOrdine } from "./articolo-ordine.model";
import { Cliente } from "./cliente.model";
import { Trasportatore } from "./trasportatore.model";
import { User } from "./user.model";

export class Fattura{
  id!: number;
  importo: number;
  trasportatore: Trasportatore;
  utente!: User;
  cliente!: Cliente;
  articoli: ArticoloOrdine[];

  constructor(importo: number,
              trasportatore: Trasportatore,
              utente: User,
              cliente: Cliente,
              articoli: ArticoloOrdine[] = [],
              id: number){
    this.id = id;
    this.importo = importo;
    this.trasportatore = trasportatore;
    this.utente = utente;
    this.cliente = cliente;
    this.articoli = articoli
  }

  filterNo0Quantity(): void {
    this.articoli = this.articoli.filter((articolo: ArticoloOrdine) => articolo.quantitaOrdine > 0);
  }
}
