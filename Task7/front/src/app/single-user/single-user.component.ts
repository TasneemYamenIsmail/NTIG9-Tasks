import { ActivatedRoute } from '@angular/router';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  userId = this.activatedRoute.snapshot.params.id
  user:any;

  constructor(
    private userService:UserService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userService.getUserById(this.userId).subscribe((res:any)=>{
      const user= res.data
      console.log('user:',user);
      this.user= user
    })
  }


}
