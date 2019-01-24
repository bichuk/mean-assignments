import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated-user',
  templateUrl: './authenticated-user.component.html',
  styleUrls: ['./authenticated-user.component.css']
})
export class AuthenticatedUserComponent implements OnInit {
  constructor(private userSvc: UserService, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    this.userSvc.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
