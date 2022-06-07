import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@modules/auth/services/login.service';
import { NotificationService } from '@shared/services/notification.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-generete-code',
  templateUrl: './generete-code.component.html',
  styleUrls: ['./generete-code.component.css']
})
export class GenereteCodeComponent implements OnInit {
  validateForm!: FormGroup;
  validateError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private loginService: LoginService,
    private router: Router,
    private notification: NotificationService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      identificator: [null, [Validators.required]],
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
