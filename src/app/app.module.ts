import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { AddRoutineFinalComponent } from './add-routine-final/add-routine-final.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutineComponent } from './routine/routine.component';
import { EditRoutineComponent } from './edit-routine/edit-routine.component';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AddRoutineComponent,
    AddRoutineFinalComponent,
    RoutineComponent,
    EditRoutineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    A11yModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
