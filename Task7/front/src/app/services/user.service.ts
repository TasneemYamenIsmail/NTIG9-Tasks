import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>('http://localhost:4000/getAllUsers');
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
    console.log('status::', status);

    return this.http.post(`http://localhost:4000/changeStatus/${userId}`,{status})
  }
}
