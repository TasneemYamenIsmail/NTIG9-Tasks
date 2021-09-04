import { ActivatedRoute } from '@angular/router';
import { TaskService } from './../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.scss']
})
export class SingleTaskComponent implements OnInit {
  taskId = this.activatedRoute.snapshot.params.id
  task:any
  constructor(
    private taskService:TaskService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.taskService.getTaskById(this.taskId).subscribe((res:any)=>{
      const task= res.data
      this.task= task
    })
  }

}
