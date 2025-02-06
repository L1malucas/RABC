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
      <h2>Login</h2>

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

      <div class="credentials-container">
        <h3>Login Credentials:</h3>
        <p>- Doctor: username 'doctor'</p>
        <p>- Nurse: username 'nurse'</p>
        <p>- Psychologist: username 'psychologist'</p>
        <p>- Admin: username 'admin'</p>
      </div>

      <div class="structure-folder">
        <h3>Project Structure:</h3>
        <pre>
C:USERSLUCAS.LIMADESKTOPCLINIC-RBACSRC 
|   index.html
|   main.ts
|   styles.scss
|
---app
    |   app.component.html
    |   app.component.scss
    |   app.component.spec.ts
    |   app.component.ts
    |   app.config.ts
    |   app.routes.ts
    |
    +---admin
    |   ---user-management
    |           user-management.component.html
    |           user-management.component.scss
    |           user-management.component.spec.ts
    |           user-management.component.ts
    |
    +---core
    |   +---guards
    |   |       auth.guard.spec.ts
    |   |       auth.guard.ts
    |   |
    |   +---interceptors
    |   |       auth.interceptor.spec.ts
    |   |       auth.interceptor.ts
    |   |
    |   +---login
    |   |       login.component.html
    |   |       login.component.scss
    |   |       login.component.spec.ts
    |   |       login.component.ts
    |   |
    |   ---services
    |           auth.service.spec.ts
    |           auth.service.ts
    |
    +---profiles
    |   +---admin
    |   |       admin.component.html
    |   |       admin.component.scss
    |   |       admin.component.spec.ts
    |   |       admin.component.ts
    |   |
    |   +---doctor
    |   |       doctor.component.html
    |   |       doctor.component.scss
    |   |       doctor.component.spec.ts
    |   |       doctor.component.ts
    |   |
    |   +---nurse
    |   |       nurse.component.html
    |   |       nurse.component.scss
    |   |       nurse.component.spec.ts
    |   |       nurse.component.ts
    |   |
    |   ---psychologist
    |           psychologist.component.html
    |           psychologist.component.scss
    |           psychologist.component.spec.ts
    |           psychologist.component.ts
    |
    ---shared
        +---components
        |   ---custom-button
        |           custom-button.component.html
        |           custom-button.component.scss
        |           custom-button.component.spec.ts
        |           custom-button.component.ts
        |
        ---models
                user-role.ts
        </pre
        >
      </div>
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
      .credentials-container,
      .structure-folder {
        margin-top: 20px;
        padding: 10px;
        background: #f3f3f3;
        border-radius: 5px;
      }
      pre {
        text-align: left;
        white-space: pre-wrap;
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
        error: () => {
          this.errorMessage = 'Invalid username or password';
        },
      });
    }
  }
}
