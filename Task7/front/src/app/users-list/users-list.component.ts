import { UserService } from './../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  users:User[] = [];
  file:any

  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private userService:UserService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
      scrollX: true
    };
   this.getUsers();
  }

  changeUserStatus(user: User){

    user.status=!user.status;
    this.userService.changeUserStatus(user.id as string, user.status).subscribe(
      res=>{
        this.getUsers();
      }
    )
  }

  deleteUser(userId:string|undefined){
    this.userService.deleteUser(userId as string).subscribe(
      res=>{
        this.getUsers();
      }
    )
  }

  getUsers(){
    this.userService.getUsers()
    .subscribe(data => {
      this.users = (data as any).data;

      this.dtTrigger.next();
    });
  }

  handleUpload(event:any){
    this.file = event.target.files[0]
    const myData= new FormData()
    myData.append('file', this.file,this.file.name)
    this.userService.upload(myData).subscribe(result=>{
      this.getUsers();

    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
