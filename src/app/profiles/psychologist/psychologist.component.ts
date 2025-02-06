import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomButtonComponent } from '../../shared/components/custom-button/custom-button.component';
import { UserRole } from '../../shared/models/user-role';

@Component({
  selector: 'app-psychologist',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent],
  template: `
    <div class="psychologist-dashboard">
      <h1>Psychologist Dashboard</h1>
      <app-custom-button 
        [label]="'View Sessions'" 
        [role]="UserRole.PSYCHOLOGIST"
      ></app-custom-button>
    </div>
  `
})
export class PsychologistComponent {
  UserRole = UserRole;
}