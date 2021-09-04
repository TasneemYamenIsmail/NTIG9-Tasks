import { User } from './../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = localStorage.getItem('myToken')?true:false;

  constructor(private http:HttpClient) { }


  public register(user: User):Observable<User>{
    return this.http.post<User>('http://localhost:4000/register',user)
  }

  public login(user: Partial<User>):Observable<any>{
    return this.http.post('http://localhost:4000/login',user)
  }

  public logout():Observable<any>{
    return this.http.post('http://localhost:4000/logout','');
  }

}
