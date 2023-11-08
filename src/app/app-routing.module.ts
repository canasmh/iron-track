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
import { AddRoutineExerciseComponent } from './add-routine-exercise/add-routine-exercise.component';
import { EditExerciseComponent } from './edit-exercise/edit-exercise.component';
import { WorkoutComponent } from './workout/workout/workout.component';
import { isNotWorkingOutGuard, isWorkingOutGuard } from './workout/is-working-out.guard';
import { SetComponent } from './workout/set/set.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent, data: { showFooter: false }, title: 'Welcome | Iron Track', canActivate: [NoAuthGuard] },
  { path: 'login', component: LoginComponent, data: { showFooter: false }, title: 'Log In | Iron Track', canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, data: { showFooter: false }, title: 'Sign Up | Iron Track', canActivate: [NoAuthGuard] },
  { path: 'routines', component: HomeComponent, title: 'Routines | Iron Track', canActivate: [AuthGuard] },
  { path: 'routines/add-routine', component: AddRoutineComponent, title: 'Add Exercises | Iron Track', canActivate: [AuthGuard] },
  { path: 'routines/add-routine/final', component: AddRoutineFinalComponent, title: 'Name Routine | Iron Track', canActivate: [AuthGuard] },
  { path: 'routines/:routine_id', component: RoutineComponent, canActivate: [AuthGuard] },
  { path: 'routines/:routine_id/edit', component: EditRoutineComponent, canActivate: [AuthGuard] },
  { path: 'routines/:routine_id/edit/:routineExercise_id', component: EditExerciseComponent, canActivate: [AuthGuard] },
  { path: 'routines/:routine_id/add', component: AddRoutineExerciseComponent, canActivate: [AuthGuard] },
  { path: 'workout/:workout_id', component: WorkoutComponent, canActivate: [AuthGuard, isNotWorkingOutGuard], canDeactivate: [isWorkingOutGuard] },
  { path: 'workout/:workout_id/:routine_exercise_id', component: SetComponent, canActivate: [AuthGuard, isNotWorkingOutGuard], canDeactivate: [isWorkingOutGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
