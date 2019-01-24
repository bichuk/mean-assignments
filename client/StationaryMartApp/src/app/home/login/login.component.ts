import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { AppError } from 'src/app/models/app.error';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: boolean;
  errorMsg: string = '';

  constructor(private router: Router, private userSvc: UserService) { }

  ngOnInit() {    
  }

  login = (form: NgForm) => {  
    this.clearError()  
    if (form.valid) {
      let userId = form.controls.userId.value;
      let password = form.controls.password.value;

      let user = new User();
      user.userId = userId;
      user.password = password;      

      this.userSvc.login(user).subscribe((res: User) => {      
        if (res instanceof AppError) {
          this.showError(res.message);
          return;
        }   
        console.log(this.userSvc.userProfile.userType)
        if (this.userSvc.userProfile.userType == 'admin')       
          this.router.navigateByUrl('/authenticated/admin-dash-board');
        else
          this.router.navigateByUrl('/authenticated');
      }, err => {
        this.showError('Failed to save data!');
        console.log(err);
      });
    }
  }

  showError(errorMsg: string) {
    this.error = true;
    this.errorMsg = errorMsg;
  }
  clearError() {
    this.error = false;
  }
}
