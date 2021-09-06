import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthencationService } from '../_services/authencation.service';
import { Router } from '@angular/router';
import {AuthService} from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: Boolean = false;
  
  constructor(
    private authService: AuthencationService,
    private router: Router,
    private checkAuthService: AuthService,
  ) { }

  loginForm = new FormGroup({
    tax_code: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  })

  loginUser() {
    this.authService.loginAuthencation(this.loginForm.value.tax_code, this.loginForm.value.username, this.loginForm.value.password).subscribe((data) => {

      if (this.authService.isLoggedInSuccess() == true) {
        this.error  = false;
        console.log("True");
        this.checkAuthService.login();
        this.router.navigate(['/home']);
      } else {
        this.error  = true;
        console.log("Incorrect");
      }
    },
    );
  }

  ngOnInit(): void {
  }

}
