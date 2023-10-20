export type Exercise = {
  id?: number,
  name: string,
  type: string,
  muscle: string,
  equipment: string,
  difficulty: string,
  instructions: string,
};

const initExercise  = {
  name: '',
  type: '',
  muscle: '',
  equipment: '',
  difficulty: '',
  instructions: ''
};

export { initExercise };

