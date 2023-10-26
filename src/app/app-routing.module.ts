import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { AddRoutineFinalComponent } from './add-routine-final/add-routine-final.component';
import { RoutineComponent } from './routine/routine.component';
import { AuthGuard, NoAuthGuard } from './auth/auth.guard';
import { EditRoutineComponent } from './edit-routine/edit-routine.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, data: { showFooter: false }, title: 'Welcome | Iron Track', canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, data: { showFooter: false }, title: 'Log In | Iron Track', canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, data: { showFooter: false }, title: 'Sign Up | Iron Track', canActivate: [NoAuthGuard] },
  { path: 'routines', component: HomeComponent, title: 'Routines | Iron Track', canActivate: [AuthGuard] },
  { path: 'routines/add-routine', component: AddRoutineComponent, title: 'Add Exercises | Iron Track', canActivate: [AuthGuard] },
  { path: 'routines/add-routine/final', component: AddRoutineFinalComponent, title: 'Name Routine | Iron Track', canActivate: [AuthGuard] },
  { path: 'routines/:routine_id', component: RoutineComponent, canActivate: [AuthGuard] },
  { path: 'routines/:routine_id/edit', component: EditRoutineComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
