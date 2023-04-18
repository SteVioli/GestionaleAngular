export class User{
  name:string;
  lastname:string;
  username:string;
  email:string;
  password:string;
  fatture?:[];
  roles!:[];
  id:number;

  constructor(name: string,
              lastname: string,
              username: string,
              email: string,
              password: string,
              id: number,
              roles: [],
              fatture?:[]
              ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.fatture = fatture;
  }
}
