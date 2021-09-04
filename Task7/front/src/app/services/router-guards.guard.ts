import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {
  constructor(
    private authSerervice:AuthService,
    private _router:Router
    ){}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

     if (!this.authSerervice.isLoggedIn){
      this._router.navigate(['register'])
      return false
     }

    return true;
  }

}
