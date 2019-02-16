import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  path;
  route;
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(state: RouterStateSnapshot) {
    return this.auth.user$
    .pipe(map(user => {
      if (user) return true;

      
      let returnUrl = state.url.toString().replace(',', '/');

      this.router.navigate(['/login'], { queryParams: { returnUrl }});    
      return false;
    }))
  }
}
