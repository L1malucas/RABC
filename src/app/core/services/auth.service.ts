import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserRole } from '../../shared/models/user-role';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    const mockUser: User = {
      id: '1',
      email: `${username}@clinic.com`,
      username,
      role: this.determineRole(username),
    };
    this.currentUserSignal.set(mockUser);
    return of(mockUser);
  }

  logout(): void {
    this.currentUserSignal.set(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  isAuthorized(allowedRoles: UserRole[]): boolean {
    const currentUser = this.getCurrentUser();
    return !!currentUser && allowedRoles.includes(currentUser.role);
  }

  private determineRole(username: string): UserRole {
    switch (username.toLowerCase()) {
      case 'doctor':
        return UserRole.DOCTOR;
      case 'nurse':
        return UserRole.NURSE;
      case 'psychologist':
        return UserRole.PSYCHOLOGIST;
      case 'admin':
        return UserRole.ADMIN;
      default:
        return UserRole.NURSE;
    }
  }
}
