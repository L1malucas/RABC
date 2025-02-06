import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserRole } from '../../shared/models/user-role';

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="user-management">
      <h2>User Management</h2>

      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <input type="text" formControlName="username" placeholder="Username" />
        <input type="email" formControlName="email" placeholder="Email" />
        <select formControlName="role">
          <option *ngFor="let role of roles" [value]="role">
            {{ role }}
          </option>
        </select>
        <button type="submit" [disabled]="userForm.invalid">Create User</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
})
export class UserManagementComponent implements OnInit {
  userForm!: FormGroup;
  users: User[] = [];
  roles = Object.values(UserRole);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: [UserRole.NURSE, Validators.required],
    });

    // Mock initial users
    this.users = [
      {
        id: '1',
        username: 'doctor1',
        email: 'doctor1@clinic.com',
        role: UserRole.DOCTOR,
      },
      {
        id: '2',
        username: 'nurse1',
        email: 'nurse1@clinic.com',
        role: UserRole.NURSE,
      },
    ];
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = {
        id: (this.users.length + 1).toString(),
        ...this.userForm.value,
      };
      this.users.push(newUser);
      this.userForm.reset({ role: UserRole.NURSE });
    }
  }
}
