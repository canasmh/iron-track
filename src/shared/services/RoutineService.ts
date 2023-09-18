import { Injectable } from "@angular/core";
import { Exercise, Routine } from "../types/customTypes";


@Injectable({
    providedIn: 'root',
})

export class RoutineService {
    private routine: Routine = {
        name: '',
        exercises: [],
    }

    getExercises() {
        return this.routine.exercises;
    }

    setExercise(exercise: Exercise) {
        this.routine.exercises = [...this.routine.exercises, exercise]
    }

    setExercises(exercises: Exercise[]) {
        this.routine.exercises = exercises
    }

    getRoutineName() {
        return this.routine.name;
    }

    setRoutineName(name: string) {
        this.routine.name = name;
    }

    getRoutine() {
        return this.routine;
    }

    resetRoutine() {
        this.routine = {name: '', exercises: []}
    }
}