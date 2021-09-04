import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(
    private userService:UserService,
    private _router:Router
    ){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const isManager= await this.userService.isManager$.pipe(take(1)).toPromise();
       if(!isManager){
          this._router.navigate(['error'])
          return false
      }
    return true;
  }

}
