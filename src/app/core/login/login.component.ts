  import { Component, OnInit } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  import { Router } from '@angular/router';
  import { AuthService } from '../services/auth.service';
  import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
  import { UserRole } from '../../shared/models/user-role';

  @Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, CustomButtonComponent],
    template: `
      <div class="login-container">
        login and password form here

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <input type="text" formControlName="username" placeholder="Username" />
          <input
            type="password"
            formControlName="password"
            placeholder="Password"
          />
          <app-custom-button
            [label]="'Login'"
            [role]="buttonRole"
            [disabled]="loginForm.invalid"
          ></app-custom-button>
        </form>
        <div *ngIf="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        structure folder here
      </div>
    `,
    styles: [
      `
        .login-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .error-message {
          color: red;
          margin-top: 10px;
        }
      `,
    ],
  })
  export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    errorMessage: string = '';
    buttonRole = UserRole.ADMIN;

    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {}

    ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }

    onSubmit(): void {
      if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;

        this.authService.login(username, password).subscribe({
          next: (user) => {
            // Navigate based on user role
            switch (user.role) {
              case UserRole.DOCTOR:
                this.router.navigate(['/doctor']);
                break;
              case UserRole.NURSE:
                this.router.navigate(['/nurse']);
                break;
              case UserRole.PSYCHOLOGIST:
                this.router.navigate(['/psychologist']);
                break;
              case UserRole.ADMIN:
                this.router.navigate(['/admin']);
                break;
              default:
                this.router.navigate(['/login']);
            }
          },
          error: (err) => {
            this.errorMessage = 'Invalid username or password';
          },
        });
      }
    }
  }
