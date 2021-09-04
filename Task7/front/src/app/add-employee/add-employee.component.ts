import { AuthService } from './../services/auth.service';
import { User } from './../models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  addEmployeeForm:FormGroup=this.fb.group({
    userName:['',[Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    password:['',[Validators.required, Validators.pattern((/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/))]],
    phoneNum:['', [Validators.pattern(/^01[0125][0-9]{8}$/)]],
    position:['',[Validators.required]],
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

  public addEmployee():void{

   if(this.addEmployeeForm.valid&& !this.isLoading){
     this.isLoading=true
    const user = new User(this.addEmployeeForm.getRawValue());
    console.log('console:',user);

    this.authService.register(user).subscribe(
      (res)=>{
        console.log('res.data:',res);
        this.isLoading=false
        this.router.navigate(['/main/users-list'])
      },
      (err)=>{
        console.log('Error',err);
        this.isLoading=false
      },
      ()=>{
        console.log('Done');
        this.isLoading=false
      }
    )
   }
   else{
     this.isLoading=false
     this.addEmployeeForm.markAsDirty();
     console.log('!valid:');
   }

  }
}
