import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ErrorComponent } from './error/error.component';
import { ManagerGuard } from './services/manager-guards';
import { RouterGuard } from './services/router-guards.guard';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
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
    canActivate: [RouterGuard, ManagerGuard]

  },
  {
    path: 'main/single-user/:id',
    component: SingleUserComponent,
    canActivate: [RouterGuard, ManagerGuard]

  },
  {
    path: 'main/add-employee',
    component: AddEmployeeComponent,
    canActivate: [RouterGuard, ManagerGuard]
  },
  {
    path: 'main/edit-user/:id',
    component: EditUserComponent,
    canActivate: [RouterGuard, ManagerGuard]
  },
  {
    path: 'main/tasks-list',
    component: TasksListComponent,
    canActivate: [RouterGuard]

  },
  {
    path: 'main/single-task/:id',
    component: SingleTaskComponent,
    canActivate: [RouterGuard]

  },
  {
    path: 'main/add-task',
    component: AddEditTaskComponent,
    canActivate: [RouterGuard, ManagerGuard]


  },
  {
    path: 'main/edit-task/:id',
    component: AddEditTaskComponent,
    canActivate: [RouterGuard, ManagerGuard]

  },

  {
    path: 'error',
    component: ErrorComponent,

  },

  { path: '**', redirectTo: '/main', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
