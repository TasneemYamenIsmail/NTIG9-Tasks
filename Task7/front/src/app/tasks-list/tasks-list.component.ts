import { UserService } from './../services/user.service';
import { TaskService } from './../services/task.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Task } from '../models';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnDestroy {

 public isManager$ = this.userService.isManager$;
  dtOptions: DataTables.Settings = {};
  tasks:Task[] = [];
  file:any

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private taskService:TaskService,
    private userService:UserService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      scrollX:true
    };

   this.getTasks();
  }


  deletetask(taskId:string|undefined){
    this.taskService.deleteTask(taskId as string).subscribe(
      res=>{
        this.getTasks();
      }
    )
  }

  getTasks(){

    this.isManager$.subscribe(isManager=>{

      if(isManager){
        this.getManagerTasks();
      }
      else{
        this.getEmployeeTasks();

      }
    })

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  assignEmployee(taskId:string|undefined){
    this.router.navigate([`/main/edit-task/${taskId}`],{queryParams:{
      assign:true
    }});
  }

  deleteTask(taskId:string|undefined){
    this.taskService.deleteTask(taskId as string).subscribe(
      res=>{
        this.getTasks();
      }
    )
  }

  getManagerTasks(){
    this.taskService.getTasks()
    .subscribe(data => {
      this.tasks = (data as any).data;

      this.dtTrigger.next();
    });
  }

  getEmployeeTasks(){
    this.taskService.getEmployeeTasks()
    .subscribe(data => {
      this.tasks = (data as any).data;

      this.dtTrigger.next();
    });
  }

  addNote(note='',taskId=''){
    this.taskService.addNote(taskId, note)
    .subscribe(data => {
      this.tasks = (data as any).data;
      this.getEmployeeTasks();
    });
  }

  addStatus(note='',taskId=''){
    this.taskService.addStatus(taskId, note)
    .subscribe(data => {
      this.tasks = (data as any).data;
      this.getEmployeeTasks();
    });
  }
}


// routerLink="/main/single-task/{{task._id}}"
