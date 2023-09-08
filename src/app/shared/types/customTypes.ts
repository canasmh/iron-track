export type Exercise = {
    workout: string,
    weight: string,
    weightUnit: string,
    sets: string,
    quantity: string,
    unit: string,
}

export type Routine = {
    name: string,
    exercises: Exercise[],
}