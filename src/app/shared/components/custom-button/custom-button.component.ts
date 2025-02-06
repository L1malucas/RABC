import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRole } from '../../models/user-role';

@Component({
  selector: 'app-custom-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [ngClass]="buttonClass"
      (click)="onClick()"
      [disabled]="disabled"
    >
      {{ label }}
    </button>
  `,
  styles: [`
    .btn {
      padding: 10px 15px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .btn-doctor { background-color: #ff4d4d; color: white; }
    .btn-nurse { background-color: #4d90fe; color: white; }
    .btn-psychologist { background-color: #4CAF50; color: white; }
    .btn-admin { background-color: #9c27b0; color: white; }
  `]
})
export class CustomButtonComponent {
  @Input() label: string = 'Button';
  @Input() role: UserRole = UserRole.NURSE;
  @Input() disabled: boolean = false;

  get buttonClass(): string {
    return `btn btn-${this.role}`;
  }

  onClick(): void {
    // Empty click handler to be overridden by parent
  }
}