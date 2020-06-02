import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
// import { UserDetails } from '../firebase/userdetails/userdetails.model';
// import { UserRole } from '../firebase/userprofile/userrole.model';

@Injectable()
export class ScopeGuardService implements CanActivate  {
  // uDetail: UserDetails[];
  // UserRoled: UserRole[];
  constructor(public auth: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
   // console.log("CanActivate");
        const scopes = (route.data as any).expectedScopes;
        //console.log("Auth 0");
        //if (!this.auth.isAuthenticated() || !this.auth.userHasScopes(scopes)) {
        if (!this.auth.isAuthenticated()) {
          //console.log("Auth 1");
          this.router.navigate(['']);
          return false;
        }
        //console.log("Auth 2");



        //return this.auth.isAdminRole();
        if (this.auth.isPostJobRole() || this.auth.isAdminRole()) {
          //console.log("Resume !");
          return true;
        }
        else {
          //console.log("Resume !!");
          if (this.auth.isResumeSearchRole()) {
            //console.log("Resume");
            return true;
          } else {
            //console.log("Resume !!!");
            return false;
          }

        }


  }
}
