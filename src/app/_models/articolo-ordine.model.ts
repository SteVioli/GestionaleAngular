import { Articolo } from "./articolo.model";

export class ArticoloOrdine{
  articolo: Articolo;
  quantitaOrdine: number;

  constructor(articolo: Articolo,
              quantitaOrdine: number = 0){
    this.articolo = articolo;
    this.quantitaOrdine = quantitaOrdine;
  }
}
