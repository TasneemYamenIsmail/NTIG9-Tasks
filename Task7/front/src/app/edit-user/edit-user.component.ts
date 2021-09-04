import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userId = this.activatedRoute.snapshot.params.id

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
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (this.userId){

      console.log(this.userId);

      this.userService.getUserById(this.userId).subscribe((res:any)=>{
        const user= res.data
        console.log('user:',user);

        this.registerForm.patchValue(user);
      })
    }
  }

  public update():void{

   if(this.registerForm.valid&& !this.isLoading){
     this.isLoading=true
    const user = new User(this.registerForm.getRawValue());
    console.log('console:',user);

    this.userService.updateUser(this.userId, {
      userName:user.userName,
      phoneNum:user.phoneNum,
      position:user.position,
      type:user.type
    }).subscribe(
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
     this.registerForm.markAsDirty();
     console.log('!valid:');
   }

  }
}
