import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, data: {showFooter: false}, title: "Welcome | Iron Track"},
  { path: 'login', component: LoginComponent, data: {showFooter: false}, title: "Log In | Iron Track"},
  { path: 'signup', component: SignupComponent, data: {showFooter: false}, title: "Sign Up | Iron Track"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
