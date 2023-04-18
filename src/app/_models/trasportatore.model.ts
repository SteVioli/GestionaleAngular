import { Fattura } from "./fattura.model";

export class Trasportatore{
  id!: number;
  nomeTrasportatore: string;
  indirizzo: string;
  citta: string;
  provincia: string;
  telefono: string;
  email: string;
  fatture: Fattura[] = []
  constructor(nomeTrasportatore: string,
              indirizzo: string,
              citta: string,
              provincia: string,
              telefono: string,
              email: string,
              id: number
              ){
  this.nomeTrasportatore = nomeTrasportatore;
  this.indirizzo = indirizzo;
  this.citta = citta;
  this.provincia = provincia;
  this.telefono = telefono;
  this.email = email;
  this.id = id
  }
}
