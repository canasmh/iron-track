export type Exercise = {
    name: string,
    weight: string,
    sets: string,
    quantity: string,
    quantityUnit: string,
}

export type ExerciseApi = {
    difficulty: string,
    equipment: string,
    instructions: string,
    muscle: string,
    name: string,
    type: string,
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

export type UserCredentials = {
    email: string,
    password: string,
}
