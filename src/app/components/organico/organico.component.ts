import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/_models/user.model';
import { AuthService } from 'src/app/auth/auth.service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-organico',
  templateUrl: './organico.component.html',
  styleUrls: ['./organico.component.scss']
})

export class OrganicoComponent implements OnInit {
user: User = {
    id:0,
    name: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    fatture: [],
    roles: []
};
userList: User[] = [];
username: string = '';
ruoli= [];

  constructor(private userService: UserService,
              private authService: AuthService){}

  ngOnInit(): void {
    this.authService.isAuthenticated();
    this.userService.getAllUser().subscribe(
      userlist => this.userList = userlist
    );
    const token =JSON.parse(localStorage.getItem("currentUser")!);
    this.username = token.username;
    this.userService.getUserByUsername(this.username).subscribe(
    user => this.user = user
    );
    this.userService.getUserByUsername(this.username).subscribe(
      user => this.ruoli = user.roles
      );
  }
  cancellaUtente(username: string){
    this.userService.deleteUserByUsername(username).subscribe(data => console.log(data));
    window.location.reload();
  }
}
