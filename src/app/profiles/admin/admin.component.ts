import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { UserRole } from '../../shared/models/user-role';
import { UserManagementComponent } from '../../admin/user-management/user-management.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent, UserManagementComponent],
  template: `
    <div class="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <app-user-management></app-user-management>
    </div>
  `,
})
export class AdminComponent {
  UserRole = UserRole;
}
