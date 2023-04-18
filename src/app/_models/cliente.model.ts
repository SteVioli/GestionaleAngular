export class Cliente {
  id!: number;
  name: string;
  lastname: string;
  nomeAzienda: string;
  indirizzo: string;
  city: string;
  provincia: string;
  telefono: string;
  email: string;
  fattura = [];

  constructor(name: string,
              lastname: string,
              nomeAzienda: string,
              indirizzo: string,
              city: string,
              provincia: string,
              telefono: string,
              email: string,
              id: number) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.nomeAzienda = nomeAzienda;
    this.indirizzo = indirizzo;
    this.city = city;
    this.provincia = provincia;
    this.telefono = telefono;
    this.email = email;
  }
}
