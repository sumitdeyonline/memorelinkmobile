import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const scopes = (route.data as any).expectedScopes;
    //if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    //return this.auth.isAdminRole();
    if (this.auth.isAdminRole()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
