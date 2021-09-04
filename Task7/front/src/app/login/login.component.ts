import { User } from './../models/user.model';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup=this.fb.group({
    userName:['',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    password:['',[Validators.required, Validators.pattern((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/))]],
  })
  isLoading= false;

  @ViewChild('formNgForm', { static: true })
  public formNgForm!: NgForm;

  constructor(
    private fb:FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  public login():void{

   if(this.loginForm.valid&& !this.isLoading){
     this.isLoading=true
    const user = this.loginForm.getRawValue();

    this.authService.login(user).subscribe(
      (res)=>{
        this.isLoading=false
        this.authService.isLoggedIn = true
        localStorage.setItem('myToken', res.data.token)

        if(res.data.user.type)
          this.router.navigate(['/main/users-list'])
        else{
          this.router.navigate(['/main/tasks-list'])
        }
      },
      (err)=>{
        this.isLoading=false
      },
      ()=>{
        this.isLoading=false
      }
    )
   }
   else{
     this.isLoading=false
     this.loginForm.markAsDirty();
   }

  }

}
