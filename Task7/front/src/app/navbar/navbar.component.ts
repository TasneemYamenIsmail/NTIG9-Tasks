import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  constructor(
    public authService: AuthService,
    public userService: UserService,
    private router: Router
    ) {

     }

    ngOnInit(){}
    login(){
      this.router.navigate(['login'])
    }
    register(){
      this.router.navigate(['register'])
    }

    logout() {
      this.authService.logout().subscribe(_=>{
        this.authService.isLoggedIn = false
        this.router.navigate(['login'])
        localStorage.removeItem('myToken');
      })
    }
}
