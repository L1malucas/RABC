import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { UserRole } from '../../shared/models/user-role';

@Component({
  selector: 'app-nurse',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  template: `
    <div class="nurse-dashboard">
      <h1>Nurse Dashboard</h1>
      <app-custom-button 
        [label]="'Patient Registration'" 
        [role]="UserRole.NURSE"
      ></app-custom-button>
    </div>
  `
})
export class NurseComponent {
  UserRole = UserRole;
}