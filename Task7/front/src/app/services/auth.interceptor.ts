import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let token = localStorage.getItem('myToken')

    if(token){

      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }
    return next.handle(request);
  }
}
