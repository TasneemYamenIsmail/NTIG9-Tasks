import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isManager$: Observable<boolean>= this.getMe().pipe(map((res:any)=>res.data.type))

  constructor(
    private http:HttpClient
  ) { }

  getUsers(){
    return this.http.get<User[]>('http://localhost:4000/getAllUsers');
  }

  getMe():Observable<User>{
    return this.http.get<User>(`http://localhost:4000/me`)
  }

  getUserById(userId:string):Observable<User>{
    return this.http.get<User>(`http://localhost:4000/user/${userId}`)
  }

  updateUser(userId:string, user:Partial<User>):Observable<User>{
    return this.http.patch<User>(`http://localhost:4000/update/${userId}`, user)
  }

  deleteUser(userId:string):Observable<User>{
    return this.http.delete<User>(`http://localhost:4000/delete/${userId}`)
  }

  changeUserStatus(userId:string, status:boolean){
    return this.http.post(`http://localhost:4000/changeStatus/${userId}`,{status})
  }

  upload(fileData:any){
    return this.http.post(`http://localhost:4000/upload`,fileData)
  }
}
