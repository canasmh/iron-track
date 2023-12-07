import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddRoutineComponent } from './add-routine/add-routine.component';
import { AddRoutineFinalComponent } from './add-routine-final/add-routine-final.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutineComponent } from './routine/routine.component';
import { EditRoutineComponent } from './edit-routine/edit-routine.component';
import { A11yModule } from '@angular/cdk/a11y';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { AddRoutineExerciseComponent } from './add-routine-exercise/add-routine-exercise.component';
import { ExercisePopUpComponent } from './exercise-pop-up/exercise-pop-up.component';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProfileComponent } from './profile/profile.component';
import {USER_TOKEN} from "../shared/types/injection-token";
import {User} from "../shared/types/User";
import { EditUserNameComponent } from './edit-user-name/edit-user-name.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';

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
    EditRoutineComponent,
    EditExerciseComponent,
    AddRoutineExerciseComponent,
    ExercisePopUpComponent,
    ProfileComponent,
    EditUserNameComponent,
    EditPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    A11yModule,
    CdkConnectedOverlay,
    CdkOverlayOrigin,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
