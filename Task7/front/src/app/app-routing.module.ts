import { EditUserComponent } from './edit-user/edit-user.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { SingleTaskComponent } from './single-task/single-task.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    redirectTo:'register',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'main/users-list',
    component: UsersListComponent,

  },
  {
    path: 'main/single-user',
    component: SingleUserComponent,

  },
  {
    path: 'main/add-edit-user/:id',
    component: EditUserComponent,

  },
  {
    path: 'main/tasks-list',
    component: TasksListComponent,

  },
  {
    path: 'main/single-task',
    component: SingleTaskComponent,

  },

  { path: '**', redirectTo: '/main', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
