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

export type User = {
    name: string,
    email: string,
    password: string,
}
