export class Articolo{
  id!: number;
  nomeArticolo: string;
  quantita: number;
  prezzo: number;
  constructor(nomeArticolo: string,
              quantita: number,
              prezzo: number,
              id: number
              ){
  this.nomeArticolo = nomeArticolo;
  this.quantita = quantita;
  this.prezzo = prezzo;
  this.id = id
  }
}
