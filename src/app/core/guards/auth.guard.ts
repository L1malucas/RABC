import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../shared/models/user-role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authService.getCurrentUser();
    const requiredRoles = route.data['roles'] as UserRole[];

    if (currentUser && this.authService.isAuthorized(requiredRoles)) {
      return true;
    }

    // Redirect to login if not authorized
    this.router.navigate(['/login']);
    return false;
  }
}