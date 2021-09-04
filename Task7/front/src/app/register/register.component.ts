import { AuthService } from './../services/auth.service';
import { User } from './../models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup=this.fb.group({
    userName:['',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    password:['',[Validators.required, Validators.pattern((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/))]],
    phoneNum:['', [Validators.pattern(/^01[0125][0-9]{8}$/)]],
    position:['',[Validators.required]],
    type:[0,[Validators.required]],
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

  public register():void{

   if(this.registerForm.valid&& !this.isLoading){
     this.isLoading=true
    const user = new User(this.registerForm.getRawValue());

    this.authService.register(user).subscribe(
      (res)=>{
        this.isLoading=false
        this.router.navigate(['/login'])
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
     this.registerForm.markAsDirty();
   }

  }
}
