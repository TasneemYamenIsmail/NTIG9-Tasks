import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private http:HttpClient
  ) { }


  getTasks():Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:4000/allTasks');
  }

  getEmployeeTasks():Observable<Task[]>{
    return this.http.get<Task[]>('http://localhost:4000/employeeTasks');
  }

  getTaskById(taskId:string):Observable<Task>{
    return this.http.get<Task>(`http://localhost:4000/getTask/${taskId}`)
  }

  addTask(task:Partial<Task>):Observable<Task>{
    return this.http.post<Task>(`http://localhost:4000/addTask`, task)
  }

  updateTask(taskId:string, task:Partial<Task>):Observable<Task>{
    return this.http.patch<Task>(`http://localhost:4000/updateTask/${taskId}`, task)
  }

  deleteTask(taskId:string):Observable<Task>{
    return this.http.delete<Task>(`http://localhost:4000/deleteTask/${taskId}`)
  }

  addNote(taskId:string,note:string):Observable<Task>{
    return this.http.post<Task>(`http://localhost:4000/task/addNote/${taskId}`, {note})
  }

  addStatus(taskId:string, status:string):Observable<Task>{
    return this.http.post<Task>(`http://localhost:4000/task/addStatus/${taskId}`, {status})
  }
}
