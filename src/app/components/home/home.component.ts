import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/auth.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  constructor(private authService: AuthServiceService){}

  ngOnInit(): void {
    this.authService.isAuthenticated()
  }
}
