import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { UserRole } from '../../shared/models/user-role';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  template: `
    <div class="doctor-dashboard">
      <h1>Doctor Dashboard</h1>
      <app-custom-button
        [label]="'View Patients'"
        [role]="UserRole.DOCTOR"
      ></app-custom-button>
    </div>
  `,
})
export class DoctorComponent {
  UserRole = UserRole;
}
