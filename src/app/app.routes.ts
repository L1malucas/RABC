import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { UserRole } from './shared/models/user-role';

export const routes: Routes = [
  {
    path: 'login', 
    loadComponent: () => import('./core/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'doctor',
    canActivate: [AuthGuard],
    data: { roles: [UserRole.DOCTOR] },
    loadComponent: () => import('./profiles/doctor/doctor.component').then(m => m.DoctorComponent)
  },
  {
    path: 'nurse',
    canActivate: [AuthGuard],
    data: { roles: [UserRole.NURSE] },
    loadComponent: () => import('./profiles/nurse/nurse.component').then(m => m.NurseComponent)
  },
  {
    path: 'psychologist',
    canActivate: [AuthGuard],
    data: { roles: [UserRole.PSYCHOLOGIST] },
    loadComponent: () => import('./profiles/psychologist/psychologist.component').then(m => m.PsychologistComponent)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: [UserRole.ADMIN] },
    loadComponent: () => import('./profiles/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  }
];