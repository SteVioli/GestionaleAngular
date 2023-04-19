import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/_models/cliente.model';
import { AuthService } from 'src/app/auth/auth.service.service';
import { ClientiService } from 'src/app/services/clienti.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {
  clienti: Cliente[] = [];
  ruoli= [];
  username: string = '';

  constructor(private clientiService: ClientiService,
              private userService: UserService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated();
    const token = JSON.parse(localStorage.getItem("currentUser")!);
    this.clientiService.getAllClienti().subscribe(
      clienti => this.clienti = clienti
    );
    const tokenDue =JSON.parse(localStorage.getItem("currentUser")!);
    this.username = tokenDue.username;
    this.userService.getUserByUsername(this.username).subscribe(
      user => this.ruoli = user.roles
      );
  }

  cancellaCliente(id: number){
    this.clientiService.cancellaClienteById(id).subscribe(data => console.log(data + "Cliente cancellato correttamente"))
    window.location.reload();
  }

}
