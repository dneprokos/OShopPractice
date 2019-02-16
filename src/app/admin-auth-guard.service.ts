import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';
import { map, switchMap, flatMap, first } from 'rxjs/operators';
import { UserService } from './user.service';
import { Observable, observable } from 'rxjs';
import { auth } from 'firebase';



@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  path;
  route; 
  
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    if (this.auth.user$)
      return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin))
    return Observable.create(false); 
  }
}
