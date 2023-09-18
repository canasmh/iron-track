import { Injectable } from "@angular/core";
import { Routine } from "../types/customTypes";


@Injectable({
    providedIn: 'root',
})

export class RoutinesService {
    private routines: Routine[] = []

    getRoutines() {
        return this.routines;
    }

    addRoutine(routine: Routine) {
        this.routines = [...this.routines, routine]
    }
}