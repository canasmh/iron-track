import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { AddRoutineFinalComponent } from './add-routine-final/add-routine-final.component';
import { RoutineComponent } from './routine/routine.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, data: { showFooter: false }, title: 'Welcome | Iron Track' },
  { path: 'login', component: LoginComponent, data: { showFooter: false }, title: 'Log In | Iron Track' },
  { path: 'signup', component: SignupComponent, data: { showFooter: false }, title: 'Sign Up | Iron Track' },
  { path: 'home', component: HomeComponent, title: 'Routines | Iron Track' },
  { path: 'home/add-routine', component: AddRoutineComponent, title: 'Add Exercises | Iron Track' },
  { path: 'home/add-routine/final', component: AddRoutineFinalComponent, title: 'Name Routine | Iron Track' },
  { path: 'home/routine/:routine_name', component: RoutineComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
