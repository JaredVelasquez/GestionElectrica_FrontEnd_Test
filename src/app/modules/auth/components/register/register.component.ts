import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { RegisterService } from '@modules/auth/services/register.service';
import {regisUser} from "src/Core/interfaces/registerUser.interface";
import { Valide } from "src/app/validators/validators.custom";
import { Router } from "@angular/router";

import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  validateForm!: FormGroup;
  customValidators: Valide = new Valide;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone'
  };
  user!: regisUser;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private message: NzMessageService,
    private notification: NotificationService
    ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required]],
      phoneNumberPrefix: ['+504'],
      phoneNumber: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      agree: [false]
    },
    {
      validators: this.customValidators.passwordMatch
    }
    
    
    );
  }

  
  submitForm(): void {
    if (this.validateForm.valid) {
      this.user = {
        email: this.validateForm.value.email,
        firstName: this.validateForm.value.firstName,
        lastName:  this.validateForm.value.lastName, 
        password: this.validateForm.value.password,
        phoneNumber: this.validateForm.value.phoneNumberPrefix + this.validateForm.value.phoneNumber,
        rolId: 1,
        username: this.validateForm.value.username,
      }
      this.registerService.SubmitRegisterUser(this.user).subscribe(
        (result:any) => {
          if(!result.id){
            this.router.navigate(['login']);
            this.notification.createNotification('success', 'Exito', 'Usuario Creado con exito');
          }
          else{
            this.notification.createNotification('error', 'Falló', result.content);

          }
          
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

  // updateConfirmValidator(): void {
  //   /** wait for refresh value */
  //   Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  // }

  // confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (control.value !== this.validateForm.controls.password.value) {
  //     return { confirm: true, error: true };
  //   }
  //   return {};
  // };

  // getCaptcha(e: MouseEvent): void {
  //   e.preventDefault();
  // }
}
