import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { UserService } from './user.service';
import { Router, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  path;
  route;

  constructor(private userSvc: UserService, private router: Router) { }

  canActivate() : boolean {
    if(!this.userSvc.isLoggedIn){
      console.log('Not authenticated..')
      this.router.navigate(['/login']);
    }    
    return this.userSvc.isLoggedIn;
  }

  canActivateChild() : boolean {    
    return this.canActivate();
  }
}
