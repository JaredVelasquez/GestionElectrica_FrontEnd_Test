import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@modules/auth/services/login.service';
import { NotificationService } from '@shared/services/notification.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  validateForm!: FormGroup;
  validateError: boolean = false;
  deadline = Date.now() + 1000 * 120;


  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router,
    private notification: NotificationService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      code: [null, [Validators.required]],
    });

  }

  
  submitForm(): void {
    if (this.validateForm.valid) {

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

