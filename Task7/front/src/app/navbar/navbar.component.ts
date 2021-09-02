import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public authService: AuthService,
    private router: Router) { }

    login(){
      this.router.navigate(['./login'])
    }
    register(){
      this.router.navigate(['./register'])
    }

    logout() {
      this.authService.logout().subscribe(_=>{
        console.log('logout:', _);
        this.authService.isLoggedIn = false
        this.router.navigate(['/auth'])
        localStorage.removeItem('myToken');
      })
    }
}
