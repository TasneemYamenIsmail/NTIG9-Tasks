import { UserService } from './../services/user.service';
import { TaskService } from './../services/task.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Task, User } from '../models';
import { map, filter } from 'rxjs/operators';

export type Response={
  apiStatus:string,
  data:User[],
  message:string
}

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit {
  taskId = this.activatedRoute.snapshot.params.id
  assign = this.activatedRoute.snapshot.queryParams.assign? true:false

  isEditView = this.taskId? true:false;

  taskForm:FormGroup=this.fb.group({
    name:['',[Validators.required]],
    type:['',[Validators.required]],
    dueDate:['', []],
    description:'',
    managerId:'',
    employeeId:null,
    status:'',
    note:'',
  })

  isLoading= false;
  employeeId =''
  employees: {name?:string, id?:string}[]=[]

  @ViewChild('formNgForm', { static: true })
  public formNgForm!: NgForm;

  constructor(
    private fb:FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    console.log(this.assign);
console.log(this.activatedRoute.snapshot.queryParams.assign);

    if(this.isEditView){
      this.taskService.getTaskById(this.taskId).subscribe((res:any)=>{
        const task= res.data
        // this.employeeId = task.employeeId;

        this.taskForm.patchValue({
          name:task.name,
          type:task.type,
          dueDate:new Date(task.dueDate).toISOString().substring(0,10),
          description:task.description,
          managerId:task.managerId,
          employeeId: task.employeeId,
          status:task.status,
          note:task.note,
        });
        if(this.assign){
          console.log(
            'assign:', this.assign
          );

          this.taskForm.disable()
          this.taskForm.controls.employeeId.enable()
        }
      })
    }
    this.getEmployees();

  }

  public handleSubmit():void{

   if(this.taskForm.valid&& !this.isLoading){
     this.isLoading=true
    const task = new Task(this.taskForm.getRawValue());

     if(this.isEditView){
       this.updateTask(task)
     }
     else{
       this.addTask(task);
     }
    console.log('console:',task);
   }
   else{
     this.isLoading=false
     this.taskForm.markAsDirty();
     console.log('!valid:');
   }

  }

  addTask(task:Partial<Task>){
    this.taskService.addTask(task).subscribe(
      (res)=>{
        console.log('res.data:',res);
        this.isLoading=false
        this.router.navigate(['/main/tasks-list'])
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

  updateTask(task:Partial<Task>){
    this.taskService.updateTask(this.taskId,task).subscribe(
      (res)=>{
        console.log('res.data:',res);
        this.isLoading=false
        this.router.navigate(['/main/tasks-list'])

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

  getEmployees(){
    this.userService.getUsers().pipe(
      map((res:any)=>{
        const users= (res.data)as User[];
        return users.filter(user=>!user.type).map(user=>{
          return {
            name:user.userName,
            id: user.id
          }
        })
      }))
    .subscribe(employees=>{
      console.log('employee::', employees);

      this.employees=employees
    })
  }
}
