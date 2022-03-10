import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CookieService} from "ngx-cookie-service";
import { key } from 'src/Core/Libraries/keys/keys.library';
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  validateForm!: FormGroup;
  validateError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      identificator: [null, [Validators.required]],
      password: [null, [Validators.required]],
      //remember: [true]
    });

  }

  
  submitForm(): void {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.cookieService.deleteAll();
      const res : any = this.loginService.SubmitLogin(this.validateForm.value).subscribe(
        (result:any) => {
          
          if(result?.token){
            console.log(result.token);
            this.validateError = false;
            this.cookieService.set("tokensession", result?.token +'' , key.TOKEN_EXPIRATION_TIME, '');
            this.router.navigate(['sys/welcome'])
          }
          else
            this.validateError = true;
            
          return result;
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

}
